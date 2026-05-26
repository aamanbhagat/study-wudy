## 1. The one-sentence answer

**In C, the name of an array is an expression that evaluates to a pointer to its first element in every context except when it is the operand of `sizeof`, the operand of the address-of operator, or a string literal initializer.**

An array declaration such as `int a[10];` reserves ten contiguous `int` objects. The identifier `a` itself is not a variable that stores an address; it is a compile-time name for the block of storage. Whenever the compiler sees `a` used where a value is required, it rewrites the expression to `&a[0]`. The resulting pointer has type `int *` and points to the initial element.

This rewriting rule, called “decay,” is performed once at each use site. It therefore explains why `a` and `&a[0]` are interchangeable in pointer arithmetic and function arguments, yet `sizeof a` still yields the full array size rather than the size of a pointer.

> [!NOTE]
> The single most important consequence is that arrays are never passed by value; only a pointer to their first element ever reaches a function.

## 2. Why this matters — concrete and current

The Linux kernel’s `copy_to_user` and `copy_from_user` routines receive user-space buffers as pointers that originated from array names in application code; the decay rule guarantees that the kernel always obtains an address rather than a copy of the entire buffer.

In the TensorFlow Lite Micro interpreter, the arena allocator stores model weights in static arrays; every access inside the hot loop relies on the array name decaying to a pointer so that the same code path works whether the data live in SRAM or flash.

NASA’s cFS (Core Flight System) flight software passes telemetry packets, which are declared as fixed-size arrays, into the software bus; the decay rule lets a single `CFE_SB_SendMsg` function accept packets of many different types without any copying.

Semiconductor vendors such as ARM supply CMSIS-DSP libraries whose FIR and FFT kernels are written in C and accept coefficient tables declared as arrays; the decay rule lets those kernels accept both compile-time tables and dynamically allocated buffers through the same pointer interface.

The SQLite B-tree implementation stores page buffers as arrays whose names are passed to the pager; decay ensures that the page cache can hand the same pointer to both the file I/O layer and the b-tree balancing routines.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Pointer types and `&`    | Decay produces a pointer; you must already know how to form and dereference one |
| `sizeof` on objects      | The principal exception to decay is `sizeof`; you must know it returns the size of the operand’s type |
| Array declarators        | You must be able to write `T a[N]` and distinguish it from `T *p` |
| Function parameter adjustment | C silently rewrites `T a[]` in a parameter list to `T *a`; decay is the reason this adjustment is safe |

## 4. Building the idea — from intuition to formalism

### Step 1 — Storage versus name
An array declaration creates a contiguous block of objects but does not create a pointer variable that holds the block’s address.  
Example: `int a[3] = {10,20,30};` places three integers at consecutive addresses; the name `a` merely labels the start of that block at compile time.  
Formally, the declaration introduces an object of type “array of 3 `int`” whose address is `&a[0]`.  
> [!WARNING] Treating `a` as a modifiable pointer variable will produce a compile-time error because no such pointer object exists.

### Step 2 — Value context triggers substitution
Whenever an array name appears where an rvalue is required, the compiler replaces the name with a pointer to the first element.  
Example: `int *p = a;` is rewritten by the compiler as `int *p = &a[0];`.  
Formally:  
$$
\text{array-name} \;\Rightarrow\; \&\text{array-name}[0]
$$  
in any context except the three listed exceptions.

### Step 3 — Pointer arithmetic follows
Because the substituted expression has pointer type, the usual pointer-arithmetic rules apply immediately.  
Example: `a[2]` is rewritten first to `(&a[0])[2]` and then to `*( &a[0] + 2 )`.  
Formally the subscript operator is defined only on pointers, never directly on arrays.

### Step 4 — Function argument passing
A function parameter declared as an array is adjusted to a pointer; decay supplies exactly that pointer.  
Example: `void f(int b[])` is rewritten by the compiler to `void f(int *b)`. Calling `f(a)` therefore passes `&a[0]`.

### Step 5 — The three exceptions
Decay is suppressed when the array name is (a) the operand of `sizeof`, (b) the operand of unary `&`, or (c) a string literal used as an initializer.  
Example: `sizeof a` yields `3*sizeof(int)`, not `sizeof(int *)`.  
Formally these are the only three syntactic contexts in which the array type is preserved.

### Step 6 — Resulting textbook rule
An array name used in an expression (other than the three exceptions) has type “pointer to element type” and value equal to the address of the first element.

## 5. Worked examples — every step shown

**Example 1 — Simple assignment**  
*Given:* `int a[5]; int *p;`  
*Find:* the effect of `p = a;`.  
Step 1: `a` appears in a value context → decay applies.  
*Why:* The assignment operator requires an rvalue on the right.  
Step 2: `a` is rewritten to `&a[0]`.  
*Why:* Definition of array-to-pointer conversion.  
Step 3: `p` receives the address of the first element.  
**Final answer:** `p` now points to `a[0]`.

*Reflection:* The example isolates the single conversion step; the same rule scales to every later use.

**Example 2 — Pointer arithmetic**  
*Given:* `int a[5] = {0};`  
*Find:* value of `*(a + 3)`.  
Step 1: `a` decays to `&a[0]`.  
*Why:* Addition requires pointer and integer operands.  
Step 2: `&a[0] + 3` points three elements past the start.  
*Why:* Pointer arithmetic scales by `sizeof(int)`.  
Step 3: Dereference yields `a[3]`.  
**Final answer:** 0 (the initial value).

*Reflection:* The arithmetic works only because decay has already occurred.

**Example 3 — Function call**  
*Given:* `void sum(int *p, size_t n);` and `int vals[4] = {1,2,3,4};`  
*Find:* result of `sum(vals, 4)`.  
Step 1: Parameter `p` is already declared pointer.  
*Why:* No further adjustment needed.  
Step 2: Argument `vals` decays to `&vals[0]`.  
*Why:* Function-call argument is a value context.  
Step 3: Inside `sum`, `p[2]` accesses the third element.  
**Final answer:** The call processes the original array through a pointer.

*Reflection:* The caller never copies the array; only the address travels.

**Example 4 — sizeof exception**  
*Given:* `int a[10];`  
*Find:* `sizeof a` versus `sizeof (a + 0)`.  
Step 1: `sizeof a` does not decay `a`.  
*Why:* Exception rule.  
Step 2: `sizeof (a + 0)` first decays `a` then takes size of the resulting pointer.  
*Why:* The `+` operator forces a value context.  
**Final answer:** 40 versus 8 (on a 64-bit system).

*Reflection:* The contrast demonstrates exactly where decay is suppressed.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| `sizeof a` inside a function      | Parameter already decayed; `sizeof` sees pointer    | Use an extra size parameter or `sizeof` on the caller’s array |
| `&a` versus `a`                   | `&a` has type “pointer to array”, not “pointer to element” | Remember `&a + 1` advances by the whole array size   |
| Assigning to array name           | No pointer object exists to receive the value       | Declare an explicit pointer variable                 |
| String literal decay in initializer | Special rule allows array initialization from literal | Do not expect the literal itself to remain modifiable |
| Multidimensional decay            | Only the first dimension decays                     | Write `int (*p)[N]` when you need a pointer to row   |
| `a++` on an array name            | Array name is not an lvalue pointer                 | Use an auxiliary pointer variable                    |
| Comparing `sizeof(a)` across translation units | Decay status depends on local declaration           | Pass size explicitly                                 |

## 7. The textbook-precise statement

C99 §6.3.2.1/3: “Except when it is the operand of the `sizeof` operator, the `_Alignof` operator, or the unary `&` operator, or is a string literal used to initialize an array, an expression that has type ‘array of type’ is converted to an expression with type ‘pointer to type’ that points to the initial element of the array object and is not an lvalue.”  
(Kernighan & Ritchie, *The C Programming Language*, 2nd ed., §5.3 contains the identical rule phrased in pre-C99 wording.)

## 8. Visual — diagram or schematic

```text
Address:  1000   1004   1008   1012   1016
Content: [  42 |   17 |    9 |  -11 |    0 ]   int a[5];
            ^
            |
         a decays to &a[0]  (type: int *)
```

The diagram shows five contiguous `int` objects. The identifier `a` never occupies a slot; the arrow indicates the pointer value produced by decay.

## 9. The memory technique

**The hook** — Picture the array as a freight train of wagons; the name painted on the locomotive is instantly replaced by the address of the first wagon whenever anyone asks for a location.

**What to overlearn** — (1) Array name → `&name[0]` except for `sizeof`, `&`, and string-initializer cases. (2) Function parameters of array type are already pointers. (3) `sizeof` on an array name yields the whole size only when decay is suppressed.

**Spaced-repetition schedule** — Review the three exceptions at 1 day, 3 days, 7 days, 16 days, and 35 days.

**First-principles fallback** — Re-derive by writing the declaration, asking what type the identifier has, then checking whether the current operator is one of the three exceptions; if not, substitute `&name[0]`.

## 10. What this unlocks

Mastery of array decay removes the most common source of type errors when moving data between functions and data structures.  

- Pointer arithmetic on multidimensional arrays  
- `restrict` and alias analysis in optimizing compilers  
- Custom allocators that return pointers to array-like storage  
- C++ container `data()` methods and span libraries  
- Zero-copy interfaces in operating-system kernels  

## 11. Self-check — five questions, no answers

1. Given `char s[] = "hello";`, what is the type and value category of the expression `s` inside `strlen(s)`?  
2. Write a declaration for a pointer that can traverse the rows of `int m[4][5]` without losing row-size information.  
3. Predict the output of `printf("%zu", sizeof ( (int[3]){1,2,3} ) );` and justify each byte.  
4. A function receives `int a[10]`. Inside the function, `sizeof a` yields 8. Explain why and how to obtain the original 40.  
5. Demonstrate a one-line expression that forces decay of an array name even when it appears as the operand of `sizeof`.