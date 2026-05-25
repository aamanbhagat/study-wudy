## What it is
Indexing and slicing are mechanisms for accessing and manipulating subsets of data within a NumPy array. Basic indexing and slicing select contiguous blocks of data using integer ranges, boolean masking selects elements based on a logical condition, and fancy indexing selects elements using an explicit list of integer indices.

## Why it matters
This is the fundamental language for data manipulation in scientific computing. In machine learning, you'll use boolean masking to filter datasets based on feature values. In aerospace, you'll slice multi-dimensional arrays representing simulation data (e.g., pressure fields) to analyze a specific region, or use fancy indexing to track a non-contiguous set of particles in a fluid dynamics simulation.

## When to study it
You must be comfortable with Python's built-in list indexing and slicing (`my_list[0]`, `my_list[1:5]`). You must also understand the basics of NumPy: how to create an `ndarray` (`np.array`, `np.arange`), and how to check its `shape` and `dtype`. Without this foundation, the multi-dimensional syntax will be confusing.

## How to study it (step by step)
1.  **Master 1D Arrays:** Create a 1D NumPy array. Practice selecting single elements (`arr[i]`), slicing from the start (`arr[:i]`), to the end (`arr[i:]`), and in the middle (`arr[i:j]`). Experiment with the `step` parameter (`arr[i:j:k]`). Note the differences and similarities with Python list slicing.
2.  **Extend to 2D Arrays (Matrices):** Create a 2D array. Practice selecting a single row (`arr[i]`), a single column (`arr[:, j]`), and a single element (`arr[i, j]`). Then, select sub-matrices by slicing both dimensions (`arr[i:j, k:l]`).
3.  **Introduce Boolean Masking:** Create a 2D array. Write a condition (e.g., `arr > 5`) and observe the output: a boolean array of the same shape. Use this boolean array as an index (`arr[arr > 5]`) and analyze the result—it will be a 1D array of all elements that satisfied the condition.
4.  **Practice Boolean Masking on Axes:** Combine boolean masking with slicing. Select entire rows where a condition on a specific column is met. For example, find all rows where the value in the first column is positive (`arr[arr[:, 0] > 0, :]`). This is an extremely common and powerful pattern.
5.  **Learn Fancy Indexing:** Create a 1D array. Create a list or array of integer indices (e.g., `indices = [0, 4, 2]`). Use this list to index the array (`arr[indices]`). See how it plucks out the elements at those specific positions.
6.  **Combine Fancy and Basic Indexing:** Extend fancy indexing to 2D. Use a list of integers to select specific rows and a basic slice to select a range of columns (e.g., `arr[[0, 3, 4], 1:3]`). This lets you select arbitrary rows but contiguous columns.

## Key ideas, with intuition
1.  **Slices are Views, Indexes are Copies:** This is the most critical performance distinction. Basic slicing (`arr[1:5, :]`) creates a *view*, which is a window into the original array's data. Modifying the view modifies the original. Boolean and fancy indexing (`arr[arr > 0]`, `arr[[1, 5]]`) create a *copy* of the data. This is because the selected elements are not necessarily contiguous in memory, so NumPy must create a new array to hold them.
2.  **Indexing is about Coordinates:** An array is a grid. Indexing is simply providing the coordinates of the data you want.
    *   `arr[2, 3]` means "the data at row 2, column 3".
    *   `arr[1:4, 0:2]` means "the data for all coordinates $(i, j)$ where $1 \le i < 4$ and $0 \le j < 2$".
3.  **Boolean Masking is a Filter:** Think of a boolean array as a stencil or a mask you lay over your data array. Only the values corresponding to a `True` in the mask are allowed to pass through. The shape of the mask must match the shape of the data it's filtering.
    $$
    A = \begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}, \quad \text{Mask} = \begin{pmatrix} \text{True} & \text{False} \\ \text{False} & \text{True} \end{pmatrix} \implies A[\text{Mask}] = \begin{pmatrix} 1 & 4 \end{pmatrix}
    $$
4.  **Fancy Indexing is a Shopping List:** Instead of describing a region (slicing) or a condition (masking), fancy indexing provides an explicit list of locations to visit. The shape of the output is determined by the shape of the index array, not the original array. `arr[[3, 1, 1]]` will return an array containing the elements at index 3, then index 1, then index 1 again.

## Worked example
**Problem:** We have a dataset of sensor readings from a rocket engine test. The data is a $5 \times 3$ array where each row is a time step, and the columns are `[Time (s), Temperature (K), Pressure (MPa)]`. We need to extract the `Time` and `Pressure` for all moments when the temperature exceeded 2500 K.

**Setup:**
```python
import numpy as np

# Data: [Time, Temp, Pressure]
data = np.array([
    [0.0, 2200, 10.1],
    [0.1, 2450, 11.5],
    [0.2, 2510, 12.3],
    [0.3, 2580, 12.9],
    [0.4, 2490, 11.8]
])
```

**Step 1: Isolate the temperature data.**
The temperature is in the second column (index 1). We can select it using a slice.
```python
temperatures = data[:, 1]
# temperatures is now array([2200., 2450., 2510., 2580., 2490.])
```
*Reflection:* We use `:` for the row dimension to mean "all rows" and `1` for the column dimension to mean "only column at index 1".

**Step 2: Create a boolean mask for the high-temperature condition.**
We want to find where `temperature > 2500`.
```python
high_temp_mask = temperatures > 2500
# high_temp_mask is now array([False, False,  True,  True, False])
```
*Reflection:* This operation is broadcast across the `temperatures` array, element-wise, creating a boolean array of the same shape.

**Step 3: Apply the mask to the original data to select rows.**
We use this mask to select the full rows from the original `data` array that correspond to the `True` values.
```python
high_temp_data = data[high_temp_mask, :]
# high_temp_data is now:
# array([[  0.2, 2510. ,   12.3],
#        [  0.3, 2580. ,   12.9]])
```
*Reflection:* The boolean mask acts as a filter on the rows. `data[high_temp_mask]` is shorthand for `data[high_temp_mask, :]`, selecting all columns for the filtered rows.

**Step 4: Select the desired columns (Time and Pressure) using fancy indexing.**
We want the first (index 0) and third (index 2) columns. We can use fancy indexing for this.
```python
result = high_temp_data[:, [0, 2]]
# result is now:
# array([[  0.2,  12.3],
#        [  0.3,  12.9]])
```
*Reflection:* We used a basic slice `:` to select all rows of our intermediate result, and then a list `[0, 2]` to explicitly pick the columns we wanted, creating the final output. This combination of techniques is powerful and common.

## Diagrams
A 2D array and how different indexing methods select data.

**Basic Slicing: `arr[1:3, 0:2]`**
Selects a contiguous block.

```text
      col 0  col 1  col 2  col 3
      +------+------+------+------+
row 0 |      |      |      |      |
      +------+------+------+------+
row 1 |######|######|      |      |
      +------+------+------+------+
row 2 |######|######|      |      |
      +------+------+------+------+
row 3 |      |      |      |      |
      +------+------+------+------+
```

**Boolean & Fancy Indexing: `arr[arr[:, 0] > 5, [0, 2]]`**
First, a boolean mask selects non-contiguous rows (e.g., rows 1 and 3). Then, fancy indexing selects non-contiguous columns from those rows (cols 0 and 2).

```text
      col 0  col 1  col 2  col 3
      +------+------+------+------+
row 0 |      |      |      |      |
      +------+------+------+------+
row 1 |######|      |######|      |  <-- Row selected by mask
      +------+------+------+------+
row 2 |      |      |      |      |
      +------+------+------+------+
row 3 |######|      |######|      |  <-- Row selected by mask
      +------+------+------+------+
```

## Memory technique — remember this forever
1.  **The Warehouse Analogy:** Your array is a giant warehouse.
    *   **Basic Slicing (`:`) is a forklift.** It grabs a big, rectangular block of pallets. It's fast and efficient. It doesn't move the items, it just gives you a *view* of that section of the warehouse.
    *   **Boolean Masking is a quality control inspector.** The inspector walks the entire warehouse with a checklist (`condition`). They put a green tag (`True`) on items that pass and a red tag (`False`) on those that fail. Then they bring you a *new cart* with a *copy* of all the green-tagged items.
    *   **Fancy Indexing is a personal shopper.** You give them a very specific, arbitrary list of locations (`[ (row_i, col_j), ... ]`). They run around the warehouse, pick up a *copy* of each item on your list, and put them on a *new cart* for you in the exact order you asked for them.

2.  **Must overlearn:**
    *   `arr[start:stop:step]`
    *   **Slicing creates a view. Modifying a slice modifies the original.**
    *   **Boolean and Fancy indexing create copies.**

3.  **Spaced Repetition Schedule:** Review these ideas and re-do the worked example from scratch at: 1 day, 3 days, 7 days, 16 days, 35 days.

4.  **First Principles Pathway:** If you forget, remember everything is about specifying coordinates. A slice `i:j` is just a compact way to write the sequence of integers `i, i+1, ..., j-1`. A boolean mask `M` is a way to generate the list of all coordinates `(r, c)` where `M[r, c]` is `True`. Fancy indexing is just providing that list of coordinates yourself.

## Common mistakes
1.  **The View vs. Copy Bug:** Modifying a slice and not realizing you've changed the original array.
    ```python
    a = np.arange(10)
    b = a[2:5] # b is a view
    b[0] = 99  # This also changes a!
    # a is now array([ 0,  1, 99,  3,  4,  5,  6,  7,  8,  9])
    ```
    If you need a copy, use `b = a[2:5].copy()`.
2.  **Incorrect Boolean Mask Shape:** Applying a boolean mask that was generated from a slice to the whole array.
    ```python
    # WRONG
    data = np.random.rand(5, 3)
    temp_col = data[:, 1]
    mask = temp_col > 0.5 # mask.shape is (5,)
    # This will raise an error or give unexpected results if you try to apply it to a 2D slice
    # For example, data[:, 1:3][mask] might not do what you think.
    # Correct way is to apply mask to rows: data[mask, 1:3]
    ```
3.  **Ambiguous Multi-dimensional Fancy Indexing:** Passing a list to select elements vs. a tuple to define coordinates.
    *   `arr[[0, 1]]` selects the first and second rows.
    *   `arr[0, 1]` selects the single element at row 0, column 1.
    *   To select elements at coordinates (0,1) and (2,3), you need `arr[[0, 2], [1, 3]]`.

## Self-check
1.  Given a 2D array `A = np.arange(16).reshape(4, 4)`, write a single line of code to select the last column and return it as a 1D array.
2.  Using the same array `A`, write a single line of code to select all rows where the value in the second column (index 1) is greater than 5.
3.  Given `A` and an array of column indices `cols = np.array([0, 2, 1, 3])`, create a 1D array `B` of length 4, where `B[i] = A[i, cols[i]]`. (That is, `B` should contain the diagonal elements of `A` but with the columns shuffled according to `cols`).