## What it is
Pandas is a Python library that provides high-performance, easy-to-use data structures and data analysis tools. Its primary structures are the `Series`, a one-dimensional labeled array, and the `DataFrame`, a two-dimensional labeled table with columns of potentially different types. Think of a `DataFrame` as a spreadsheet or an SQL table that you can manipulate programmatically.

## Why it matters
In any scientific or engineering discipline, you work with data. Pandas is the bedrock tool for cleaning, transforming, analyzing, and preparing that data for visualization or modeling. For aerospace, you'll use it to analyze telemetry from a flight test; for physics, to process results from an experiment; for machine learning, it's the standard for preprocessing data before feeding it into a model.

## When to study it
You should have a solid grasp of core Python (lists, dictionaries, functions, loops) and a working knowledge of NumPy. Pandas is built on NumPy; a `DataFrame` is conceptually a dictionary of NumPy arrays that all share an index. Without understanding NumPy's array-based computation, Pandas' performance and syntax will feel like magic rather than logic.

## How to study it (step by step)
1.  **Master the `Series`:** Create a `Series` from a Python list. Practice accessing elements using the index, which can be integers (like a list) or custom labels (like a dictionary).
    ```python
    import pandas as pd
    s = pd.Series([9.8, 1.62, 3.71], index=['Earth', 'Moon', 'Mars'])
    print(s['Moon'])
    ```
2.  **Build and Index `DataFrames`:** Create a `DataFrame` from a dictionary of lists. Practice selecting data using `.loc[]` for label-based indexing and `.iloc[]` for integer-position-based indexing. This distinction is critical.
    ```python
    data = {'mass_kg': [5.97e24, 7.35e22], 'radius_km': [6371, 1737]}
    df = pd.DataFrame(data, index=['Earth', 'Moon'])
    print(df.loc['Earth', 'mass_kg']) # Select by label
    print(df.iloc[0, 0])             # Select by position
    ```
3.  **Perform a `groupby`:** Take a `DataFrame` with categorical data. Use `.groupby('column_name')` to group the rows based on the unique values in that column. Then, apply an aggregation function like `.mean()`, `.sum()`, or `.count()` to calculate a summary statistic for each group.
4.  **Practice `merge`:** Create two distinct but related `DataFrames`. They should share a common column (a "key"). Use `pd.merge(df1, df2, on='key_column')` to combine them, similar to a JOIN in SQL.
5.  **Reshape with `pivot_table`:** Use `.pivot_table()` to transform your data from a "long" format to a "wide" format. This is essential for creating summary tables. Specify an `index`, `columns`, and `values` to aggregate.

## Key ideas, with intuition
1.  **Series: A Labeled Array.** A NumPy array is a powerful but anonymous sequence of numbers. A Pandas `Series` gives each element a name via an `index`. This is the key difference. Instead of asking for "the element at position 2", you can ask for "the value for 'Mars'".
2.  **DataFrame: A Dictionary of Aligned Series.** A `DataFrame` is a collection of `Series` (the columns) that all share the same `index` (the row labels). This **index alignment** is the core magic of Pandas. When you perform an operation like `df['col1'] + df['col2']`, Pandas automatically matches the rows based on their index labels before adding. This prevents countless off-by-one and misalignment errors that are common with simple lists or arrays.
3.  **Indexing: `.loc` vs `.iloc`**. This is a common point of confusion.
    -   `.loc` selects data by **L**abel. It's inclusive of the end point. `df.loc['row_A':'row_C']` includes `row_C`.
    -   `.iloc` selects data by **I**nteger position. It follows Python's standard exclusive slicing. `df.iloc[0:2]` includes rows at position 0 and 1, but *not* 2.
4.  **Split-Apply-Combine (`groupby`)**: This is the most powerful pattern in data analysis.
    -   **Split**: The data is broken into groups based on some criteria (e.g., all measurements from `sensor_A`, all from `sensor_B`).
    -   **Apply**: A function is applied independently to each group (e.g., calculate the `mean()` of the temperature for each sensor's data).
    -   **Combine**: The results of the function applications are combined into a new data structure.

## Worked example
Let's simulate analyzing telemetry from a rocket launch. We have sensor readings and a separate table with sensor metadata.

**Step 1: Create the DataFrames**
We have one DataFrame for sensor readings (`readings`) and another for sensor metadata (`sensors`).

```python
import pandas as pd
import numpy as np

# Sensor readings: timestamp, sensor ID, and value
readings_data = {
    'timestamp_s': [0.1, 0.1, 0.2, 0.2, 0.3, 0.3],
    'sensor_id': ['T1', 'P1', 'T1', 'P1', 'T1', 'P1'],
    'value': [25.1, 101.3, 28.5, 100.9, 950.2, 95.2]
}
readings = pd.DataFrame(readings_data)

# Sensor metadata: ID, type, and location
sensors_data = {
    'sensor_id': ['T1', 'P1', 'V1'],
    'type': ['temperature', 'pressure', 'vibration'],
    'location': ['engine', 'tank', 'strut']
}
sensors = pd.DataFrame(sensors_data)
```

**Step 2: Merge the DataFrames**
To understand the readings, we need to know what each sensor is and where it is. We merge the two DataFrames on their common column, `sensor_id`.

```python
# Merge readings with sensor metadata
data = pd.merge(readings, sensors, on='sensor_id', how='left')
print("--- Merged Data ---")
print(data)
```
*Reflection:* `merge` worked because both `readings` and `sensors` had a `sensor_id` column that acted as a key to link the information. We used a `left` merge to keep all readings, even if a sensor wasn't in our metadata table (though in this case, all were).

**Step 3: Groupby to find average readings by location**
We want to know the average reading for each location on the rocket. This is a classic Split-Apply-Combine problem.

```python
# Group by location and type, then calculate the mean
avg_by_location = data.groupby(['location', 'type'])['value'].mean()
print("\n--- Average Value by Location and Type ---")
print(avg_by_location)
```
*Reflection:* `groupby` first split the `data` DataFrame into groups (all 'engine' rows, all 'tank' rows). Then, for each group, it selected the `value` column and applied the `.mean()` function. Finally, it combined these mean values into a new `Series` with a hierarchical index (`location`, `type`).

**Step 4: Pivot to view data over time**
Let's reshape the data to see how each sensor type's value changes over time.

```python
# Pivot the table to have time as index, type as columns
time_series_view = data.pivot_table(index='timestamp_s', columns='type', values='value')
print("\n--- Time Series Pivot Table ---")
print(time_series_view)
```
*Reflection:* `pivot_table` took the long-format `data` and reshaped it. It used unique values from `timestamp_s` for the new index, unique values from `type` for the new columns, and filled the table with the corresponding `value`. This format is much better for plotting or time-series analysis.

## Diagrams

A DataFrame is a 2D labeled structure.

```text
       <-- Columns (Labels) -->
      +-------------+-----------+
      |  pressure   | temp_C    |
+-----+-------------+-----------+
| T=0 |    101.3    |   25.1    |   <-- Row (Data)
+-----+-------------+-----------+
| T=1 |    101.2    |   25.3    |
+-----+-------------+-----------+
| T=2 |    100.9    |   26.1    |
+-----+-------------+-----------+
^
|
Index (Labels)
```

The `groupby` (Split-Apply-Combine) process:

```text
Original DataFrame
+----------+-------+
| Location | Temp  |
+----------+-------+
| Engine   | 950   |
| Tank     | -180  |
| Engine   | 955   |
| Strut    | 25    |
| Tank     | -182  |
+----------+-------+
       |
       V SPLIT by 'Location'
+----------+-------+     +----------+-------+     +----------+-------+
| Engine   | 950   |     | Tank     | -180  |     | Strut    | 25    |
| Engine   | 955   |     | Tank     | -182  |     +----------+-------+
+----------+-------+     +----------+-------+
       |                        |                       |
       V APPLY mean() to each group
     mean=952.5               mean=-181.0              mean=25.0
       |                        |                       |
       +------------------------+-----------------------+
       |
       V COMBINE into a new Series
+----------+---------+
| Location | Temp    |
+----------+---------+
| Engine   | 952.5   |
| Tank     | -181.0  |
| Strut    | 25.0    |
+----------+---------+
```

## Memory technique — remember this forever
1.  **Story:** Think of a `DataFrame` as a master blueprint for a rocket.
    -   The `index` represents the part numbers (e.g., `part-001`, `part-002`).
    -   The `columns` are the properties of each part (`mass_kg`, `material`, `vendor`).
    -   `df.loc['part-001']` is looking up a specific part on the blueprint by its official number.
    -   `df.iloc[0]` is just grabbing the first part listed, whatever it is.
    -   `df.groupby('vendor')` is sorting all the parts into piles, one for each vendor, to calculate the total mass supplied by each.
    -   `pd.merge(df, vendors_df)` is taking your blueprint and stapling the vendor's contact sheet to it, matching by vendor name.

2.  **Must overlearn:**
    -   `df.loc[rows, cols]` — **L**abel-based, inclusive slice.
    -   `df.iloc[rows, cols]` — **I**nteger-based, exclusive slice.
    -   `df.groupby('key_col')['data_col'].agg_func()` — The Split-Apply-Combine template.

3.  **Spaced Repetition Schedule:** Review this material and your own practice code at: 1 day, 3 days, 7 days, 16 days, 35 days.

4.  **First Principles Pathway:** If you forget everything, remember this: A `DataFrame` is a dictionary of `Series` objects that share an index. You can always decompose a problem by iterating over `df.columns` and operating on each `Series` individually, then stitching the results back together. This will be slow, but it allows you to rebuild the logic of more complex functions from the ground up.

## Common mistakes
1.  **`SettingWithCopyWarning`:** This happens when you try to modify a slice of a DataFrame, e.g., `df[df['A'] > 0]['B'] = 5`. Pandas can't guarantee whether you're modifying a temporary copy or the original `df`. Always use `.loc` for assignment: `df.loc[df['A'] > 0, 'B'] = 5`.
2.  **Confusing `.loc` and `.iloc` Slicing:** Remember `.loc` is label-based and *inclusive* (`df.loc[0:2]` gets rows with index labels 0, 1, AND 2), while `.iloc` is position-based and *exclusive* (`df.iloc[0:2]` gets rows at positions 0 and 1). This is a frequent source of off-by-one errors.
3.  **Forgetting to `reset_index()`:** After a `groupby`, the grouping keys become the new index of the result. This is often useful, but if you want to treat them as regular columns again for further processing, you must call `.reset_index()`.
4.  **Merge Key Mismatches:** Using `pd.merge` when the key columns have different data types (e.g., one is `int` and the other is `str`). This will fail silently or produce an empty result. Always check `df.dtypes` before merging.

## Self-check
1.  Create a DataFrame with columns `student_id`, `course_name`, and `grade`. Select all the grades for the student with `student_id` of 1138.
2.  Using the DataFrame from Q1, calculate the average grade for each `course_name`.
3.  You are given a second DataFrame containing `course_name` and `course_credits`. Merge this with your original DataFrame and then create a pivot table showing the average grade for each student (`student_id` as index) in courses of different credit values (`course_credits` as columns).