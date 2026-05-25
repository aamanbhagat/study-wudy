## What it is
Nested data structures are containers that hold other containers as their elements. A "list of dictionaries" is a list where each item is a dictionary. A "dictionary of lists" is a dictionary where each value associated with a key is a list.

## Why it matters
This pattern is the foundation for representing most structured data in computing, from web APIs to scientific datasets. In machine learning, you might use a list of dictionaries to store features for a batch of training examples. In aerospace, a simulation of a rocket launch could produce a dictionary where keys are sensor names ('altitude', 'velocity') and values are lists of their readings over time.

## When to study it
You must be comfortable with Python's two primary collection types first. Ensure you have mastered:
1.  **Lists:** Creating them (`[]`), indexing (`my_list[0]`), appending (`.append()`), and iterating with a `for` loop.
2.  **Dictionaries:** Creating them (`{}`), accessing values by keys (`my_dict['key']`), adding new key-value pairs, and iterating over keys or items.
If these are not second nature, pause and review them before proceeding.

## How to study it (step by step)
1.  **Construct manually:** Open a Python interpreter. Create three distinct dictionaries representing, for example, three stars, with keys like `'name'`, `'mass'`, and `'type'`. Then, create an empty list and manually `.append()` each dictionary to it. Print the final list to see its structure.
2.  **Practice access:** From the list you just created, write the code to access the mass of the second star. Then, write code to access the name of the third star. Notice the pattern: `list[index]['key']`.
3.  **Iterate and process:** Write a `for` loop that iterates through your list of stars. Inside the loop, print a formatted string for each star, like `f"{star['name']} is a {star['type']}-type star."`. This solidifies the concept of treating each item in the loop as a complete dictionary.
4.  **Reverse the structure:** Now, create a single dictionary to represent a planetary system. Use keys like `'planets'`, `'dwarf_planets'`, and `'asteroids'`. The value for each key should be a list of strings (the names of the bodies in that category).
5.  **Practice access (reversed):** From the dictionary you just created, write the code to access the first planet in the `'planets'` list. Then, access the third asteroid. Notice the pattern: `dict['key'][index]`.
6.  **Synthesize:** Write a function that takes a list of dictionaries (like your stars) and a key name (like `'mass'`) as input, and returns the average value for that key across all dictionaries in the list. This combines iteration, access, and calculation.

## Key ideas, with intuition
1.  **Containers of Containers:** The core idea is composition. A simple list is a container for simple items (numbers, strings). A nested structure is a container where the items are themselves containers. Think of a cargo ship (the outer container) carrying shipping containers (the inner containers).
2.  **List of Dicts → A "Table" of Data:** A list of dictionaries is the most common way to represent tabular data, like a spreadsheet. The list represents the rows, and each dictionary represents a single row, with the keys acting as the column headers. Each dictionary must have the same set of keys to form a consistent table.

    $$
    \text{data} = [\underbrace{\{'id': 1, 'val': 'A'\}}_{\text{row 0}}, \underbrace{\{'id': 2, 'val': 'B'\}}_{\text{row 1}}, \dots]
    $$

3.  **Dict of Lists → A "Record" with Time-Series Data:** A dictionary of lists is excellent for grouping related collections. Think of a medical record where keys are `'heart_rate'`, `'blood_pressure'`, and the value for each is a list of measurements taken over time. The dictionary holds the record, and the lists hold the history.

    $$
    \text{data} = \{'sensor_A': \underbrace{[0.1, 0.2, 0.3, \dots]}_{\text{time series A}}, 'sensor_B': \underbrace{[9.8, 9.8, 9.7, \dots]}_{\text{time series B}}\}
    $$

4.  **Access is Chained, Left-to-Right:** To get to the data you want, you "peel the onion" from the outside in. You first use an index or key to access the inner container, and then you use another index or key to access the element inside that inner container. The syntax directly follows this logic: `outer_container[access_outer][access_inner]`.

## Worked example
**Problem:** We have telemetry data from a flight test, structured as a list of dictionaries. Each dictionary is a snapshot in time. Find the maximum altitude achieved during the test.

**Data:**
```python
flight_data = [
    {'time_s': 0, 'altitude_m': 10, 'velocity_mps': 0},
    {'time_s': 1, 'altitude_m': 50, 'velocity_mps': 45},
    {'time_s': 2, 'altitude_m': 150, 'velocity_mps': 80},
    {'time_s': 3, 'altitude_m': 130, 'velocity_mps': 50}
]
```

**Step-by-step solution:**

1.  **Initialize a variable to track the maximum.** We need a placeholder to store the highest altitude we've seen so far. We can initialize it to a very small number or to the altitude from the first data point. Let's use the first data point for robustness.

    ```python
    # Assume the first reading has the max altitude until we find a higher one.
    max_altitude = flight_data[0]['altitude_m'] 
    ```

2.  **Iterate through the data.** We need to check every snapshot. A `for` loop is the correct tool to visit each dictionary in the list.

    ```python
    for snapshot in flight_data:
        # 'snapshot' will be one dictionary per loop iteration
        # e.g., {'time_s': 0, 'altitude_m': 10, 'velocity_mps': 0} in the first loop
    ```

3.  **Access the altitude in the current snapshot.** Inside the loop, for each `snapshot` dictionary, we need to get the value associated with the `'altitude_m'` key.

    ```python
    for snapshot in flight_data:
        current_altitude = snapshot['altitude_m']
    ```

4.  **Compare and update.** Compare the `current_altitude` with our `max_altitude`. If the current one is greater, we have a new maximum, so we update our variable.

    ```python
    max_altitude = flight_data[0]['altitude_m'] 
    
    for snapshot in flight_data:
        current_altitude = snapshot['altitude_m']
        if current_altitude > max_altitude:
            max_altitude = current_altitude
    ```

5.  **Print the final result.** After the loop has finished checking all snapshots, the `max_altitude` variable will hold the highest value found.

    ```python
    print(f"Maximum altitude reached: {max_altitude} meters")
    # Output: Maximum altitude reached: 150 meters
    ```

**Reflection:**
- Step 1 worked because we needed a stateful variable to compare against during iteration.
- Step 2 worked because a `for` loop is the canonical way to process each element of a list sequentially.
- Step 3 worked because we used dictionary key-based access (`snapshot['altitude_m']`) on the element provided by the loop. This is the core "list of dicts" access pattern.
- Step 4 worked because the `if` statement correctly updated our state, ensuring `max_altitude` always stores the highest value seen *so far*.

## Diagrams
A list of dictionaries can be visualized as a primary vertical container (the list) holding horizontal containers (the dictionaries).

```text
flight_data (a list)
+-----------+
| index 0   | ----> {'time_s': 0, 'altitude_m': 10, 'velocity_mps': 0}
+-----------+
| index 1   | ----> {'time_s': 1, 'altitude_m': 50, 'velocity_mps': 45}
+-----------+
| index 2   | ----> {'time_s': 2, 'altitude_m': 150, 'velocity_mps': 80}
+-----------+
| index 3   | ----> {'time_s': 3, 'altitude_m': 130, 'velocity_mps': 50}
+-----------+
```
Accessing `flight_data[2]['altitude_m']` means:
1. Go to index `2` of the list.
2. From the dictionary you find there, get the value for the key `'altitude_m'`.

A dictionary of lists can be visualized as a primary container with named slots (the keys), where each slot holds a vertical container (a list).

```text
sensor_readings (a dict)
+-----------------+
| key 'temp_C'    | ----> [25, 26, 26, 27]
+-----------------+
| key 'pressure_Pa' | ----> [101325, 101320, 101321]
+-----------------+
| key 'humidity_%'  | ----> [45, 46, 45, 45, 44]
+-----------------+
```
Accessing `sensor_readings['pressure_Pa'][1]` means:
1. Go to the value associated with the key `'pressure_Pa'`.
2. From the list you find there, get the element at index `1`.

## Memory technique — remember this forever
1.  **Mnemonic:**
    -   A **L**ist is a **L**ine (or **L**adder). You access it by number (index).
    -   A **D**ictionary is a **D**escription. You access it by name (key).
    -   **List of Dicts**: A "Line of Descriptions". To get data: `line_number`, then `description_name`. `data[index]['key']`.
    -   **Dict of Lists**: A "Description of Lines". To get data: `description_name`, then `line_number`. `data['key'][index]`.

2.  **Facts to overlearn (do not paraphrase):**
    -   Access a list of dictionaries: `list_variable[index]['key']`
    -   Access a dictionary of lists: `dict_variable['key'][index]`
    -   To iterate a list of dicts: `for item_dict in list_variable:`

3.  **Spaced Repetition Schedule:**
    -   Review these access patterns and the mnemonic now.
    -   Tomorrow (Day 1)
    -   In 3 days
    -   In 7 days
    -   In 16 days
    -   In 35 days
    Each review should take < 5 minutes. Write the access patterns from memory.

4.  **First Principles Pathway:** If you forget, don't guess. Rebuild it. The expression `data[x][y]` is evaluated left-to-right.
    -   First, evaluate `data[x]`. What does that give you? Is it a list or a dictionary?
    -   Let's say `result = data[x]`. Now, what is `result[y]`? You are now performing an access on the *inner* container. The type of `result` dictates whether `y` should be an integer index or a string key.

## Common mistakes
1.  **Incorrect access order:** Writing `flight_data['altitude_m'][2]` instead of `flight_data[2]['altitude_m']`. The outer container is a list, so its accessor *must* be an integer index first.
2.  **Assuming consistent keys:** In a list of dictionaries, it's possible for one dictionary to be missing a key that others have. Trying to access `snapshot['velocity_mps']` will raise a `KeyError` if that specific `snapshot` dictionary doesn't have that key. Always check with `if 'key' in snapshot:` or use the `.get()` method (`snapshot.get('key', default_value)`) for robust code.
3.  **Modifying a loop variable incorrectly:** When you loop `for snapshot in flight_data:`, the `snapshot` variable is a reference to the dictionary in the list. Modifying `snapshot` (e.g., `snapshot['altitude_m'] = 999`) will modify the original list. This can be useful, but also a source of bugs if you don't intend it.

## Self-check
1.  Given the `flight_data` list from the example, write a single line of code that retrieves the velocity at time `t=1s`.
2.  Write a block of code that iterates through `flight_data` and adds a new key-value pair, `'status': 'nominal'`, to every dictionary in the list.
3.  Write a function `get_times_above_altitude(data_list, threshold)` that takes the `flight_data` list and an altitude threshold (e.g., 100 meters) and returns a new list containing only the `time_s` values for all snapshots where the altitude was above that threshold.