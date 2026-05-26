## 1. The one-sentence answer
**NumPy indexing and slicing select and manipulate array elements through integer positions, contiguous ranges, boolean predicates, and arbitrary index arrays.**

Basic indexing retrieves a single element by its coordinate tuple. Slicing extracts contiguous blocks by supplying start:stop:step triples along each axis; the result is a view, not a copy. Boolean masking builds a same-shaped array of True/False values and retains only the positions that evaluate to True. Fancy indexing supplies arrays of integer coordinates and gathers the corresponding elements into a new array whose shape follows the broadcast shape of the index arrays.

These four operations together replace explicit Python loops with vectorized expressions that map directly onto BLAS and SIMD hardware.

> [!NOTE]
> The decisive insight is that every indexing expression returns either a view or a copy; distinguishing the two determines whether later mutations affect the original data.

## 2. Why this matters — concrete and current
In the Fermi-LAT gamma-ray telescope pipeline, boolean masks isolate photon events whose reconstructed energy lies inside a narrow band; the mask is applied once per orbit and reduces 10^7 raw counts to a few thousand science-ready photons without any explicit loop.

Semiconductor foundries use fancy indexing inside process-control scripts to extract sub-matrices of wafer metrology data at the exact (row, column) coordinates flagged by a defect-detection neural net; the extracted patches feed a downstream regression model that predicts yield loss.

Inside the JAX implementation of transformers, slicing and advanced indexing assemble attention masks and position embeddings on the fly; the same expression runs unchanged on CPU, GPU, and TPU because the indexing semantics are defined by the XLA compiler rather than by Python iteration.

Climate-model post-processing at NCAR selects vertical levels and time windows from petabyte-scale NetCDF arrays using a combination of slice objects and boolean masks derived from quality-control flags; the resulting workflow reduced I/O volume by two orders of magnitude compared with the previous Fortran indexing code.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| ndarray shape and strides| Determine which memory addresses are visited by any index expression |
| Python slice object      | The syntactic form a:b:c is literally a slice instance passed to __getitem__ |
| Broadcasting rules       | Govern how multiple index arrays or a boolean mask combine with the target array |
| View versus copy semantics | Decide whether an assignment mutates the original data or a temporary |

## 4. Building the idea — from intuition to formalism

### Step 1 — Single-element retrieval by coordinate tuple
An ndarray is a homogeneous block of memory together with a shape tuple. Supplying a tuple of integers selects the unique element whose offsets along each axis equal those integers.

For a 3-by-4 array `A`, the expression `A[1, 2]` yields the element at row 1, column 2.

Formally,  
$$
A[i_0,i_1,\dots,i_{n-1}] = A.\text{data}\Bigl[\sum_{k=0}^{n-1} i_k\cdot s_k\Bigr]
$$
where \(s_k\) are the strides.

> [!WARNING]
> Supplying an index outside [0, shape[k]) raises IndexError; negative indices are interpreted only after the shape is known.

### Step 2 — Range selection via slice objects
A slice `start:stop:step` expands to a set of indices \(i = start + m\cdot step\) for integer \(m\) such that \(0\le i < shape[k]\). The resulting sub-array shares memory with the original.

For the same `A`, `A[0:2, 1:3]` produces a 2-by-2 view whose (0,0) element is `A[0,1]`.

### Step 3 — Boolean arrays as selection predicates
A boolean array `mask` of identical shape produces a one-dimensional result containing exactly those elements for which `mask` is True. The operation is equivalent to gathering elements whose linear indices satisfy the predicate.

### Step 4 — Integer arrays as coordinate lists (fancy indexing)
When an index position is itself an ndarray of integers, NumPy gathers the elements at those coordinates. Multiple such arrays are broadcast together.

### Step 5 — Combining basic, boolean, and fancy indices
Any mixture is allowed; the result shape is determined by broadcasting all index arrays after the boolean mask has been converted to integer coordinates.

### Step 6 — View versus copy decision rule
An expression yields a view when the selected elements form a regular, strided sublattice; otherwise a copy is allocated. Assignment through a view mutates the base array; assignment through a copy does not.

## 5. Worked examples — every step shown

**Example 1 — Basic slice on a 1-D array**  
*Given:* `x = np.arange(10)`  
*Find:* elements at positions 2, 3, 4, 5.  
`x[2:6]` expands the slice to indices 2,3,4,5.  
*Why:* The slice object is converted once by `ndarray.__getitem__`.  
**Result:** `array([2,3,4,5])`

*Reflection:* The result is a view; `x[2:6][0] = 99` changes `x[2]`.

**Example 2 — Boolean mask on a 2-D array**  
*Given:* `A = np.array([[1,2,3],[4,5,6]])`, `mask = A > 3`  
*Find:* values greater than 3.  
`mask` evaluates elementwise.  
`A[mask]` gathers the four satisfying entries.  
*Why:* Boolean indexing always flattens the selection into 1-D.  
**Result:** `array([4,5,6])`

*Reflection:* The mask shape must match the array or broadcast to it.

**Example 3 — Fancy indexing with two coordinate arrays**  
*Given:* `A` 3-by-4, `rows = np.array([0,2])`, `cols = np.array([1,3])`  
*Find:* `A[[0,2],[1,3]]`.  
The index arrays are broadcast to shape (2,).  
Elements `(0,1)` and `(2,3)` are collected.  
*Why:* Distinct index arrays supply independent coordinates.  
**Result:** `array([2,15])` (assuming concrete values).

*Reflection:* The output shape follows the broadcast shape of the index arrays, not the original array.

**Example 4 — Mixed indexing with assignment**  
*Given:* `B = np.zeros((4,4))`, `mask = np.array([True,False,True,False])`  
*Find:* set the second and fourth columns of the selected rows to 7.  
`B[mask, 1:3] = 7` first selects rows via the mask, then slices columns.  
*Why:* The boolean dimension is replaced by its integer positions before the slice is applied.  
**Result:** rows 0 and 2 have 7 in columns 1 and 2.

*Reflection:* The assignment writes through a temporary view; the original `B` is mutated.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| `arr[arr > 0] = 0` unexpectedly changes shape | Boolean indexing always returns 1-D | Use `arr[arr > 0] = 0` only when flattening is intended; otherwise combine with `np.where` |
| Negative step in slice reverses axis but keeps view | Slice semantics are independent of sign | Remember that `arr[::-1]` is still a view; test with `.base` |
| Fancy index with duplicate coordinates produces duplicates | No uniqueness requirement | Explicitly call `np.unique` on index arrays if duplicates are undesired |
| Assignment to a sliced expression fails silently | Slice produced a copy instead of a view | Check `arr.flags['OWNDATA']` after slicing when mutation is expected |
| Boolean mask of wrong dtype treated as integer index | NumPy accepts any integer type for fancy indexing | Cast masks explicitly: `mask.astype(bool)` |
| Out-of-bounds fancy index raises only at access time | Index validation occurs inside the ufunc loop | Validate index ranges with `np.logical_and` before indexing large arrays |
| Chained indexing `arr[mask][0] = 5` does not mutate original | Second indexing step creates a copy | Perform the assignment on the original array using combined indexing |

## 7. The textbook-precise statement
An ndarray \(A\) of shape \(\mathbf{n}=(n_0,\dots,n_{d-1})\) supports the generalized index expression  
\[
A[\mathbf{i}_0,\mathbf{i}_1,\dots,\mathbf{i}_{d-1}]
\]  
where each \(\mathbf{i}_k\) is either an integer, a slice, an ndarray of integers, or a boolean ndarray. The expression is evaluated by first converting every boolean array to integer coordinates via `np.nonzero`, then broadcasting all index arrays together. The result shape is the broadcast shape of the index arrays; the result is a view precisely when the selected coordinates form a regular sublattice of the original strides. (NumPy Reference Manual, version 1.26, section “Indexing routines”.)

## 8. Visual — diagram or schematic
```text
2-D array A (shape 4×5)            indices selected by A[1:3, [0,2,4]]
row 0:  0  1  2  3  4
row 1:  5  6  7  8  9   ───►  row1, cols 0,2,4  →  5 7 9
row 2: 10 11 12 13 14   ───►  row2, cols 0,2,4  → 10 12 14
row 3: 15 16 17 18 19
```
The diagram shows the two source rows and the three chosen columns; the resulting 2×3 array is assembled from those six memory locations.

## 9. The memory technique
1. **The hook** — picture a librarian who can hand you either a single book (integer), a whole shelf segment (slice), every red-covered book (boolean), or an arbitrary list of call numbers (fancy).  
2. **What to overlearn** — the four index types and the single rule “boolean → 1-D, fancy → broadcast shape, slice → view when possible”.  
3. **Spaced-repetition schedule** — 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — rebuild any expression by enumerating the linear offsets produced by the index tuple and checking whether they form an arithmetic progression.

## 10. What this unlocks
Mastery of these indexing primitives is the prerequisite for vectorized implementations of algorithms that dominate scientific Python.

- Broadcasting and ufunc internals
- Advanced array manipulation (`np.take`, `np.compress`, `np.put`)
- Efficient sparse-matrix construction via fancy indexing
- GPU kernel argument preparation in Numba and CuPy
- Construction of attention masks and positional encodings in neural-network frameworks

## 11. Self-check — five questions, no answers
1. Given a 5-by-5 array, write the minimal indexing expression that extracts the main diagonal as a 1-D array without copying.  
2. Predict the shape and memory-sharing status of `A[[0,0,1], :]` versus `A[[0,1], :]`.  
3. Explain why `A[A>0][0] = 99` may leave the original array unchanged while `A[A>0] = 0` always mutates it.  
4. Construct a boolean mask that selects every third element along axis 0 of a 3-D array and verify that the result is one-dimensional.  
5. Demonstrate that the assignment `B[:, [1,3]] = C` where `C` has shape (4,2) succeeds, but `B[[1,3], :] = C` fails when `B` is 4-by-4; state the exact shape mismatch.