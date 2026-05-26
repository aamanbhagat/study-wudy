## 1. The one-sentence answer

**A pointer to a pointer is a variable that stores the memory address of another pointer variable.**

In C every variable lives at some address. An ordinary pointer holds the address of a data object; therefore the address of that pointer itself is just another number that can be stored. The language therefore permits a second level of indirection: a variable whose type is “pointer to pointer to T”. This single extra level is enough to let a function modify the caller’s pointer, to build ragged arrays, or to walk multi-dimensional dynamic structures without copying data.

The mechanics remain exactly the same as ordinary pointers—addresses are still integers of type `uintptr_t`—but each additional asterisk adds one more level of dereference that the programmer must track. The result is a uniform mechanism that scales from single objects to trees and graphs while staying inside the same address-space model.

> [!NOTE]
> The decisive insight is that the extra asterisk does not create a new kind of object; it merely records one more layer of addressing, so every rule you already know about pointers applies recursively.

## 2. Why this matters — concrete and current

In the Linux kernel the `task_struct` pointer passed to `copy_process` is itself obtained through a pointer-to-pointer chain that walks the `pid_namespace` hierarchy; a single mis-step here produces the infamous “use-after-free” in CVE-2022-2588.  

CUDA device kernels receive a `void**` argument that points to the host-side pointer returned by `cudaMalloc`; NVIDIA’s runtime therefore uses exactly one extra level of indirection to keep device and host addresses distinct without copying the entire allocation descriptor.  

SQLite’s B-tree cursor implementation stores a `BtCursor**` so that a single `sqlite3BtreeCursor` call can replace the caller’s cursor with a freshly allocated one when the underlying page cache is resized; this pattern appears unchanged since the 2005 HotStorage paper.  

The reference-counted object graph inside CPython’s garbage collector is traversed by a `PyObject***` stack that records both the object and the slot that points to it, allowing the collector to break cycles without scanning the entire heap on every collection.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Ordinary pointer (`T *`) | The base case; a pointer-to-pointer is simply `T **`     |
| Address-of operator `&`  | Produces the address that the outer pointer must store   |
| Dereference operator `*` | Must be applied once per level of indirection            |
| `malloc` / `free`        | Dynamic storage whose address must be stored somewhere   |
| Function call semantics  | Pass-by-value means a pointer argument must itself be passed by address when the callee needs to mutate it |

## 4. Building the idea — from intuition to formalism

### Step 1 — Every object has an address
A variable occupies a fixed location in memory; that location is itself an integer.  
`int x = 42;` places the value 42 at some address, say `0x7fff1234`.  
Formally: if `x` has type `T`, then `&x` has type `T *`.  
> [!WARNING]  
> Forgetting that `&x` yields a pointer, not the value of `x`, leads to treating addresses as data.

### Step 2 — A pointer is just another object
Because a pointer is an object, it also occupies an address.  
`int *p = &x;` stores `0x7fff1234` inside `p`; `p` itself lives at, say, `0x7fff5678`.  
Thus `&p` has type `int **`.

### Step 3 — Declare the extra level explicitly
Write an asterisk for each level of indirection:  
`int **pp;` declares an object `pp` whose type is “pointer to pointer to `int`”.  
The declaration is read right-to-left: “pointer to (pointer to `int`)”.

### Step 4 — Initialise the outer pointer with an address of a pointer
`pp = &p;` stores the address of `p` inside `pp`.  
After this assignment `*pp == p` and `**pp == x`.

### Step 5 — Dereference once per level
`*pp` yields the inner pointer `p`; `**pp` yields the original `int`.  
Each `*` removes one layer; the number of asterisks must match the declaration depth.

### Step 6 — Textbook statement of the result
A pointer-to-pointer variable therefore obeys the same address and dereference rules as any other pointer, merely applied recursively.  
Formally, if `pp` has type `T **`, then `*pp` has type `T *` and `**pp` has type `T`, provided every intermediate pointer is non-null and properly aligned.

## 5. Worked examples — every step shown

**Example 1 — Single integer via pointer-to-pointer**  
*Given:* `int x = 7; int *p = &x; int **pp = &p;`  
*Find:* value of `**pp`.  
`*pp` reads the contents of `pp`, which is the address stored in `p`.  
`*(*pp)` therefore follows that address and obtains `x`.  
**7**  

*Reflection:* The double dereference simply unwinds two address layers; the pattern generalises to any depth.

**Example 2 — Swap two pointers**  
*Given:* `int a=1, b=2; int *pa=&a, *pb=&b; int **pp = &pa;`  
*Find:* swap `pa` and `pb` using only `pp`.  
`int *tmp = *pp;` stores the current value of `pa`.  
`*pp = pb;` makes `pa` point to `b`.  
`pp = &pb;` (or equivalently `*(pp+1)` if contiguous) stores the saved pointer into `pb`.  
**`pa` now points to `b`, `pb` now points to `a`**  

*Reflection:* The extra level lets the callee replace the caller’s pointer without returning it.

**Example 3 — Allocate a dynamic array of pointers**  
*Given:* need an array of 3 `int*` pointers on the heap.  
`int **arr = malloc(3*sizeof(int*));`  
`arr[0] = malloc(sizeof(int)); *arr[0]=10;`  
Same pattern for indices 1 and 2.  
**`arr` is a pointer to the first element of an array whose elements are themselves pointers**  

*Reflection:* The first `malloc` yields a `void*` that is immediately stored in an `int**`; the second level stores data pointers.

**Example 4 — Return a newly allocated pointer from a function**  
*Given:* `void alloc_int(int **out) { *out = malloc(sizeof(int)); **out=42; }`  
Call: `int *p = NULL; alloc_int(&p);`  
Inside the function `*out` is an alias for `p`, so the assignment writes the new address directly into the caller’s variable.  
**`p` now holds a valid heap address containing 42**  

*Reflection:* Passing the address of the pointer is the only way a callee can change where the caller’s pointer points.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| `int **pp = &x;`                  | Type mismatch: `&x` is `int*`, not `int**`  | Always take address of a pointer object              |
| Forgetting second `*` when freeing| `free(pp)` frees only the outer pointer     | `free(*pp); free(pp);` for each owned level          |
| Uninitialised inner pointer       | Outer pointer allocated but inner not set   | Zero the block or assign immediately after `malloc`  |
| `**pp` on a null inner pointer    | Outer pointer valid, inner still NULL       | Check `*pp != NULL` before second dereference        |
| Losing track of ownership         | Multiple pointers claim the same allocation | Document which pointer owns each level of storage    |
| Off-by-one in ragged arrays       | `arr[i][j]` when `arr[i]` itself is NULL    | Always initialise every element of the outer array   |
| Casting away a level              | `int *p = (int*)pp;`                        | Never discard an asterisk without an explicit reason |

## 7. The textbook-precise statement

Let `T` be an object type. An expression `pp` of type `T **` is a pointer to pointer if it satisfies the following: for every integer `i` such that `0 ≤ i < n`, the expression `*(pp + i)` yields a value of type `T *` (or is a null pointer), and each such pointer, when dereferenced, yields an object of type `T`. All intermediate pointers must be correctly aligned for type `T *`. (Kernighan & Ritchie, *The C Programming Language*, 2nd ed., §5.6 and §7.8.5.)

## 8. Visual — diagram or schematic

```text
Address          Contents          Interpretation
0x1000           0x2000            int x = 42;          // data
0x2000           0x1000            int *p  = &x;        // pointer
0x3000           0x2000            int **pp = &p;       // pointer-to-pointer

Dereference chain:
pp   → 0x2000  (type int *)
*pp  → 0x1000  (type int)
**pp → 42      (type int)
```

## 9. The memory technique

1. **The hook** — Picture two arrows: a small arrow from `pp` to `p`, then a longer arrow from `p` to the data; the double arrow is the mnemonic for “pointer-to-pointer”.
2. **What to overlearn** — Declaration `T **` always needs two `*` when dereferenced to reach `T`; `&` applied to a `T *` produces `T **`.
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive by starting from a single variable, taking its address, then taking the address of that pointer; each new address adds one asterisk.

## 10. What this unlocks

Pointer-to-pointer is the gateway to dynamic multi-dimensional arrays, modifiable function arguments that are themselves pointers, and the implementation of trees and graphs using only raw memory.  

- Dynamic 2-D arrays (`int **`)  
- Passing `FILE **` to library routines that may re-open streams  
- Building adjacency-list graphs with `struct Node **` arrays  
- Implementing reference-counted or garbage-collected object graphs  

## 11. Self-check — five questions, no answers

1. Given `int x; int *p; int **pp;`, write the single assignment that makes `**pp` equal `x`.
2. Why does `void f(int **p)` allow the caller’s pointer to be changed while `void f(int *p)` does not?
3. After `int **pp = malloc(5*sizeof(int*));`, how many `malloc` calls are still required before every element of `pp` can be safely dereferenced?
4. Identify the bug: `int **pp = &x; *pp = 5;`.
5. In a function that must return both a newly allocated buffer and its size through pointer arguments, which parameter types are required?