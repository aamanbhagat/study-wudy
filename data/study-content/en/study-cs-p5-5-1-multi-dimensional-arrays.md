## 1. The one-sentence answer
**A multi-dimensional array in C is a contiguous block of memory addressed by multiple indices that map to a single linear offset via row-major ordering.**

In the simplest case a two-dimensional array stores elements in a rectangular grid. The compiler treats the grid as one long sequence of bytes, calculating the exact location of any element from its row and column indices alone. Higher dimensions simply extend the same arithmetic: each new index multiplies the stride of all subsequent dimensions.

The programmer writes `int a[2][3];` yet the machine never stores any notion of “rows” or “columns”; it only stores 6 integers in order. All indexing operations are therefore compile-time arithmetic that produces a single pointer offset.

> [!NOTE]
> The decisive insight is that C never allocates a true matrix; it allocates a flat vector and gives you convenient syntax that hides the offset calculation.

## 2. Why this matters — concrete and current
NASA’s Earth Observing System uses two-dimensional arrays to hold raw radiance values from MODIS instruments; each 2048-by-2048 tile is processed in C before being handed to higher-level science codes.

Modern CPU cache simulators (such as those inside Intel VTune) represent cache lines as three-dimensional arrays indexed by set, way, and byte offset so that replacement-policy experiments run at native speed.

The linear-algebra kernels inside PyTorch’s ATen library still contain hand-written C routines that traverse four-dimensional tensors (batch, channel, height, width) using exactly the same row-major stride arithmetic that a C compiler emits for `float t[32][64][224][224]`.

Semiconductor place-and-route tools store millions of transistor coordinates in a two-dimensional array of structs; the inner dimension indexes metal layers while the outer indexes net identifiers, allowing O(1) lookup during timing analysis.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| One-dimensional arrays | Multi-dimensional arrays are syntactic sugar over a single flat allocation. |
| Pointer arithmetic   | Index expressions such as `a[i][j]` expand to `*(a + i*COLS + j)`. |
| `sizeof` operator    | Determines the stride of each dimension at compile time.  |
| Storage duration     | Static versus automatic arrays affect whether the block lives on the stack or in data. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Declaring a rectangular block
You write the sizes of every dimension inside separate bracket pairs. The rightmost dimension varies fastest in memory.

```c
int grid[3][4];
```

This sentence declares a block large enough for 12 integers. The formal declaration syntax is  
$$T\ name[D_1][D_2]\dots[D_n]$$  
where each \(D_k\) must be a compile-time constant expression.

> [!WARNING]
> Omitting any size except the first when passing the array to a function loses all dimension information; the compiler can no longer compute strides.

### Step 2 — Row-major memory layout
The elements are stored row by row. Element `(i,j)` occupies linear position  
$$i \times D_2 + j$$  
in a two-dimensional array.

### Step 3 — Accessing an element
The expression `grid[i][j]` is rewritten by the compiler as  
```c
*(grid + i * 4 + j)
```
The multiplier 4 is the compile-time constant `sizeof(int[4])`.

### Step 4 — Initialisation syntax
Nested braces mirror the logical shape:

```c
int grid[3][4] = {
    {0,1,2,3},
    {4,5,6,7},
    {8,9,10,11}
};
```

### Step 5 — Decay to pointer
When the array name appears in most contexts it becomes `&grid[0]`, a pointer to an array of 4 integers. The type is `int (*)[4]`.

### Step 6 — Textbook statement
A multi-dimensional array of element type \(T\) and dimensions \(D_1 \times D_2 \times \dots \times D_n\) occupies a contiguous region of \(D_1 \times D_2 \times \dots \times D_n \times \mathrm{sizeof}(T)\) bytes whose address of element \((i_1,i_2,\dots,i_n)\) is given by the linear offset  
$$\sum_{k=1}^n i_k \cdot S_k$$  
where the stride \(S_k = \prod_{m=k+1}^n D_m\).

## 5. Worked examples — every step shown

**Example 1 — Linear offset for a 3-by-4 array**  
*Given:* `int a[3][4];` locate `a[2][1]`.  
*Find:* byte offset from start of `a`.  

Step 1: Compute row stride = 4.  
*Why:* The second dimension size is 4.  

Step 2: Offset = 2 × 4 + 1 = 9.  
*Why:* Two complete rows plus one element into the third row.  

**9 elements** (i.e., address `a + 9`).

*Reflection:* The calculation is pure integer arithmetic; no indirection occurs at runtime.

**Example 2 — Initialiser with partial braces**  
*Given:* `int b[2][3] = {{1},{2,3}};`  
*Find:* value of `b[1][2]`.  

Step 1: First row receives 1 followed by two zeros.  
*Why:* Missing initialisers are zero-filled.  

Step 2: Second row receives 2, 3 and one zero.  
*Why:* Same rule applies to the inner list.  

**0**

*Reflection:* Partial initialisation is legal but easy to misread; explicit zeros improve clarity.

**Example 3 — Passing a 2-D array to a function**  
*Given:* `void f(int x[][4], size_t rows);`  
*Find:* correct call for the array declared in Example 1.  

Step 1: Write `f(a, 3);`.  
*Why:* The first dimension may be omitted; the second must be present so the compiler knows the stride.  

**Correct call**

*Reflection:* The parameter type `int (*x)[4]` encodes the necessary stride.

**Example 4 — Manual stride calculation for 3-D**  
*Given:* `float v[2][3][4];` compute offset of `v[1][0][2]`.  
*Find:* linear index.  

Step 1: Innermost stride = 1, middle stride = 4, outer stride = 12.  
*Why:* Each dimension multiplies the product of all lower dimensions.  

Step 2: 1 × 12 + 0 × 4 + 2 × 1 = 14.  
*Why:* Apply the general formula.  

**14**

*Reflection:* Extending the same arithmetic to any number of dimensions yields the general multi-dimensional indexing rule.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Forgetting the column size in a function parameter | C requires all but the first dimension for stride calculation | Always write the full type `T (*a)[COLS]`            |
| Using variable-length arrays without realising they are VLAs | Modern C allows non-constant sizes, but stack overflow risk rises | Prefer static sizes or explicit `malloc`             |
| Treating `a[i][j]` as a pointer to a pointer | The array does not store pointers; it stores data contiguously | Remember the decay rule: only the array name decays  |
| Over-running the last dimension   | Compiler cannot insert bounds checks                | Use `assert` or range-checked wrappers during debug  |
| Copying a multi-dimensional array with `memcpy` using wrong byte count | Programmers count logical elements instead of bytes | Always multiply total elements by `sizeof(T)`        |
| Initialising with single braces   | Inner dimensions receive flattened values           | Use nested braces matching the logical shape         |
| Returning a stack-allocated 2-D array from a function | The array’s lifetime ends at return                 | Return a pointer to malloc’d storage or use output parameter |

## 7. The textbook-precise statement
An object declared as  
```c
T a[D1][D2]...[Dn];
```  
is a multi-dimensional array object of element type \(T\) whose address calculation follows the rule given in K&R, *The C Programming Language*, 2nd ed., §5.7: the expression `a[i1][i2]...[in]` is equivalent to  
```c
*((T *)a + ((...((i1)*D2 + i2)*D3 + ... )*Dn + in))
```  
provided every index lies within its declared bound.

## 8. Visual — diagram or schematic
```text
Address:  0   1   2   3   4   5   6   7   8   9  10  11
Element: a00 a01 a02 a03 a10 a11 a12 a13 a20 a21 a22 a23
         ↑──────── row 0 ────────┘ ↑──────── row 1 ────────┘
Stride:  4 elements per row
```
Each cell holds one `int`; the entire block occupies 12 contiguous words.

## 9. The memory technique

**The hook**  
Picture a bookshelf: each shelf is a row, each book on the shelf is a column. The librarian walks shelf by shelf, never jumping between shelves in the middle of a book.

**What to overlearn**  
- Row stride = size of one complete inner dimension.  
- `a[i][j] == *(&a[0][0] + i*COLS + j)`.  
- All dimensions except the first must appear in function parameter types.

**Spaced-repetition schedule**  
Review the offset formula at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback**  
Start from the single flat allocation `T *p = malloc(D1*D2*sizeof(T))`; then derive the index expression by counting complete rows.

## 10. What this unlocks
Mastery of multi-dimensional arrays immediately permits correct use of image buffers, dense linear-algebra kernels, and stencil codes. The next concepts that depend on it are:

- Pointer-to-array types for higher-rank function arguments  
- Flexible array members inside structs  
- Dynamic multi-dimensional allocation via pointer-to-pointer or single-block-plus-stride schemes  
- Cache-aware blocking transformations that treat the same memory layout as a tiled matrix

## 11. Self-check — five questions, no answers
1. Write the exact type of the parameter that receives `int matrix[5][6]` inside a function without losing dimension information.  
2. Compute the linear offset of element `[3][1][2]` inside `short cube[4][5][6]`.  
3. A programmer writes `int a[2][3] = {1,2,3,4};`. Which elements receive the value 4 and why?  
4. Explain why `sizeof(arr)` yields the total byte count only when `arr` is declared inside the same scope, never when it has decayed to a pointer.  
5. Identify the latent defect: a function declared `void transpose(int a[4][4])` is called with a stack array whose second dimension is accidentally declared as 5.