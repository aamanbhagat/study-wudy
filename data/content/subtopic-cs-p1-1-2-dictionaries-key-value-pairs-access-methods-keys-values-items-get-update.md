## What it is
A dictionary is a data structure that stores a collection of key-value pairs. Each unique key maps to a specific value, much like a real-world dictionary maps a word (the key) to its definition (the value). Unlike a list, which is an ordered sequence of elements, a dictionary is an unordered collection optimized for retrieving a value when you know its corresponding key.

## Why it matters
Dictionaries are fundamental for representing structured data. In physics simulations, you might store the properties of a particle in a dictionary: `{'mass': 9.11e-31, 'charge': -1.602e-19, 'spin': 0.5}`. In machine learning, a data point (e.g., sensor readings from a rocket) is often represented as a dictionary where keys are feature names (`'temperature'`, `'pressure'`) and values are the measurements. This structure is the basis for formats like JSON, which is ubiquitous in web APIs and configuration files.

## When to study it
You should be comfortable with Python's basic data types: strings, integers, and floats. You must also understand variables, assignment (`=`), and the `list` data structure, including how to access elements using an index (e.g., `my_list[0]`).

## How to study it (step by step)
1.  **Create and Inspect:** Open a Python interpreter. Create your first dictionary: `rocket_parts = {'engine': 'Merlin 1D', 'fuel_tanks': 2, 'payload_mass_kg': 22800}`. Print the dictionary to see its structure.
2.  **Direct Access:** Access the value for the `'engine'` key using square brackets: `print(rocket_parts['engine'])`. Now, try to access a key that doesn't exist, like `rocket_parts['guidance_computer']`, and observe the `KeyError`. This is an important failure mode to understand.
3.  **Safe Access with `.get()`:** Repeat the previous step, but use the `.get()` method: `computer = rocket_parts.get('guidance_computer', 'Not specified')`. Print the `computer` variable. Notice how it returns the default value `'Not specified'` instead of crashing. This is the robust way to access keys that might be missing.
4.  **Modify and Add:** Add a new key-value pair: `rocket_parts['guidance_computer'] = 'Custom FPGA'`. Then, modify an existing value: `rocket_parts['payload_mass_kg'] = 25000`. Print the dictionary again to see the changes.
5.  **Iterate with Methods:** Use a `for` loop with the three main view methods.
    *   `for key in rocket_parts.keys(): print(key)`
    *   `for value in rocket_parts.values(): print(value)`
    *   `for key, value in rocket_parts.items(): print(f"{key}: {value}")`
    This last one, `.items()`, is the most common and useful for iteration.
6.  **Merge with `.update()`:** Create a second dictionary: `engine_specs = {'thrust_sl_kN': 845, 'isp_vac_s': 311}`. Merge this into your original dictionary with `rocket_parts.update(engine_specs)`. Print `rocket_parts` to see that the new key-value pairs have been added.

## Key ideas, with intuition
1.  **A Mapping, Not a Sequence:** A list is like a numbered rack of mailboxes. You find items by their position (index 0, 1, 2...). A dictionary is like a rolodex or a phone book. You don't care about the *position* of an entry; you find the information (value) by looking up a unique name (key). The lookup is direct and extremely fast.
    $$
    \text{List: } \text{index} \rightarrow \text{value} \\
    \text{Dictionary: } \text{key} \rightarrow \text{value}
    $$
2.  **Keys Must Be Unique and Immutable:**
    *   **Unique:** If you had two entries for the key `'mass'`, which value would be correct? The dictionary enforces uniqueness; adding a new value for an existing key simply overwrites the old value.
    *   **Immutable:** Keys must be of a type that cannot change, like a string, number, or tuple. You cannot use a list as a key. This is because Python uses a technique called *hashing* to make lookups fast. It converts the key into a number that tells it where to store the value. If the key could change, its hash would change, and the dictionary would lose track of the value.
3.  **The "Bag of Stuff" Model:** Think of a dictionary as a bag where you put items. Each item has a unique tag (the key) on it. To get an item out, you just tell the bag the tag you're looking for. You don't need to empty the whole bag and check every item (like you would in a list). This "direct lookup" property is why dictionaries are so efficient.

## Worked example
Let's model the physical constants of Earth. We'll start with some known data, add a new piece of information, and correct an existing one.

**Step 1: Initial Data Structure**
Create a dictionary to hold Earth's parameters.
```python
earth = {
    'name': 'Earth',
    'mass_kg': 5.972e24,
    'radius_km': 6371,
    'moons': ['Moon'] # A list can be a value
}
```
*Reflection:* We've created a clear, readable representation of our data. The keys are strings describing the data, and the values are of appropriate types (string, float, integer, list).

**Step 2: Access and Print a Value**
We need to calculate the escape velocity, which requires the mass. Let's access it.
```python
earth_mass = earth['mass_kg']
print(f"Earth's mass is {earth_mass} kg.")
```
*Reflection:* Using the square bracket notation `['mass_kg']` is the direct way to retrieve the value associated with that key.

**Step 3: Update a Value**
We realize our radius measurement is the mean radius, but for a specific orbital calculation, we need the equatorial radius.
```python
earth['radius_km'] = 6378
print(f"Updated equatorial radius: {earth['radius_km']} km.")
```
*Reflection:* Modifying a value is as simple as assigning a new value to that key. If the key exists, its value is replaced.

**Step 4: Add a New Key-Value Pair**
We want to add the orbital period.
```python
earth['orbital_period_days'] = 365.25
print(earth)
```
*Reflection:* Adding a new piece of data uses the exact same syntax as updating. If the key `'orbital_period_days'` doesn't exist, Python creates it.

**Final State:**
The final `earth` dictionary is:
```python
{
    'name': 'Earth',
    'mass_kg': 5.972e24,
    'radius_km': 6378,
    'moons': ['Moon'],
    'orbital_period_days': 365.25
}
```

## Diagrams
A dictionary is a set of pointers from keys to values.

```text
     Keys         Values
  +----------+
  | 'mass'   | ----> 5.972e24
  +----------+
  | 'radius' | ----> 6371
  +----------+
  | 'name'   | ----> 'Earth'
  +----------+
```

The `.items()` method gives you a view of these pairings as tuples:

```text
            .items() view
+------------------------------------+
|                                    |
|  [ ('mass', 5.972e24),             |
|    ('radius', 6371),               |
|    ('name', 'Earth') ]              |
|                                    |
+------------------------------------+
```

## Memory technique — remember this forever
1.  **The Coat Check Analogy:** A dictionary is a coat check at a fancy event.
    *   You hand over your coat (the **value**).
    *   You get a unique ticket number (the **key**).
    *   To get your coat back, you don't describe the coat. You provide the ticket (`my_dict['ticket_number']`). It's a direct, fast lookup.
    *   Trying to use a ticket number that doesn't exist will cause a problem (`KeyError`).
    *   Asking the attendant if they have a ticket (`.get('ticket_number')`) is a safer way to ask.
2.  **Must Overlearn:**
    *   Creation: `d = {'key': 'value'}`
    *   Access (unsafe): `val = d['key']`
    *   Access (safe): `val = d.get('key', default_if_missing)`
3.  **Spaced Repetition Schedule:** Review your notes and re-do the "How to study it" steps at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days.
4.  **First Principles Pathway:** If you forget a method like `.update()`, how can you rebuild it? You can always fall back on a `for` loop. To merge `dict2` into `dict1`:
    ```python
    for key, value in dict2.items():
        dict1[key] = value
    ```
    This is the fundamental logic that `.update()` provides as a convenient shortcut.

## Common mistakes
1.  **`KeyError`:** Accessing a key with `my_dict['non_existent_key']` instead of the safer `my_dict.get('non_existent_key')`. The first one crashes your program if the key is not found.
2.  **Mutable Keys:** Trying to use a list as a key: `my_dict[['a', 'b']] = 1`. This will raise a `TypeError: unhashable type: 'list'`. Keys must be immutable.
3.  **Relying on Order (Pre-Python 3.7):** In older versions of Python, dictionaries did not preserve the insertion order of keys. While modern Python does, it's bad practice to write code that assumes dictionary keys will always be in a specific sequence. If you need a guaranteed order, use a `list` of items.

## Self-check
1.  Create a dictionary representing the properties of the star Proxima Centauri, including its name, mass (in solar masses), and distance from Earth (in light-years). Then, write a single line of code to retrieve and print its distance.
2.  You are given a dictionary of sensor statuses: `sensors = {'temp_1': 'OK', 'pressure_1': 'OK', 'vibration': 'FAIL'}`. Write a function that takes a sensor name (a string) as input. The function should return the sensor's status if it exists, and the string `'UNKNOWN'` if it does not.
3.  You have two dictionaries representing telemetry data from two different moments in time.
    `t1 = {'velocity': 1500, 'altitude': 50000, 'fuel': 0.75}`
    `t2 = {'velocity': 1650, 'altitude': 52000, 'temperature': -20}`
    Write code to create a new dictionary, `t_merged`, that contains all the information from both. If a key exists in both dictionaries (like `'velocity'`), the value from `t2` should overwrite the value from `t1`.