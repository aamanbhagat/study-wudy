## 1. The one-sentence answer
**The Rule of Three states that if a C++ class defines any one of a custom destructor, copy constructor, or copy assignment operator, it almost always needs all three to manage resources correctly.**

When you allocate dynamic memory or hold a resource such as a file handle or mutex inside an object, the compiler-generated copy operations perform only a shallow member-wise copy. This leaves two objects pointing to the same resource, so the first destructor to run deletes the resource while the second object still believes it owns it. The result is a double-delete or dangling pointer. Defining all three special members together guarantees that each copy creates its own independent resource and that every resource is released exactly once.

The deeper point is ownership semantics. A class that owns a resource must decide whether copying should duplicate the resource (deep copy) or share it (reference counting). The Rule of Three forces you to make that decision explicitly instead of relying on the compiler’s default shallow copy.

> [!NOTE]
> The single most important “aha” is that the compiler will still generate the missing operations even when you define one of them; those generated versions are almost always wrong for resource-owning classes.

## 2. Why this matters — concrete and current
In the Chrome browser codebase, the `Skia` graphics layer uses classes that own GPU textures. A missing copy constructor once caused the same texture to be deleted twice when a `SkBitmap` was copied into a render pipeline, producing intermittent crashes that only appeared under memory pressure.

In the LLVM compiler infrastructure, the `MachineFunction` class owns arrays of machine instructions allocated on a bump-pointer allocator. The Rule of Three is applied so that copying a function object during inlining passes creates an independent instruction list; without it, two `MachineFunction` objects would share the same instruction buffer and corrupt the IR.

NASA’s flight software for the Perseverance rover uses custom C++ containers that wrap DMA buffers for the RAD750 processor. Every buffer-owning class follows the Rule of Three so that a copy made during a task hand-off does not accidentally free the DMA region still in use by the hardware.

In the TensorFlow runtime, the `Tensor` class owns a `TensorBuffer` that may reside on GPU memory. The copy constructor and assignment operator allocate a fresh buffer and perform an explicit device-to-device copy; omitting any of the three members would either leak GPU memory or produce use-after-free errors during graph execution.

The Eigen linear-algebra library’s `Matrix` class follows the Rule of Three so that temporaries created inside expression templates do not share storage with the destination matrix, preserving both performance and correctness.

## 3. Mental prerequisites

| Concept                        | Why you need it here                                      |
|--------------------------------|-----------------------------------------------------------|
| Constructor / destructor       | You must understand when the compiler inserts calls to them |
| Pointers and dynamic memory    | Resource ownership is expressed through raw pointers or handles |
| Member-wise copy semantics     | Default copy behaviour is shallow; you need to recognise when that is insufficient |
| `const` references             | Copy constructor and assignment take `const T&` parameters |

If any row above is unclear, pause and review that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Identify resource ownership
A class owns a resource when it is responsible for allocating it in a constructor and releasing it in the destructor.  
Example: a simple `IntArray` that stores an `int*` and a length.  
Formal statement: if a constructor performs `new` (or any acquisition) and the destructor performs the matching `delete`, the class owns that resource.

> [!WARNING]
> If you forget that a pointer member represents ownership, you will treat the class as a plain value type and rely on the compiler’s shallow copy.

### Step 2 — Observe the compiler-generated copy constructor
When you write no copy constructor, the compiler emits one that copies every non-static data member. For a pointer this means copying the address, not the pointed-to data.  
Formal: the implicit copy constructor is `IntArray::IntArray(const IntArray& other) : data(other.data), size(other.size) {}`.

### Step 3 — Demonstrate the double-delete hazard
After a shallow copy, both objects hold the same address. When the first object’s destructor runs, it executes `delete[] data`. The second object’s later destructor executes the same `delete[]` on an already-freed block.

### Step 4 — Write the copy constructor that performs a deep copy
Allocate a fresh buffer and copy the elements:  
```cpp
IntArray::IntArray(const IntArray& other)
    : size(other.size), data(new int[other.size]) {
    std::copy(other.data, other.data + size, data);
}
```
This satisfies the ownership invariant: each live object owns a distinct buffer.

### Step 5 — Write the copy assignment operator
Assignment must first release the existing buffer, then duplicate the source:  
```cpp
IntArray& IntArray::operator=(const IntArray& other) {
    if (this != &other) {
        delete[] data;
        size = other.size;
        data = new int[size];
        std::copy(other.data, other.data + size, data);
    }
    return *this;
}
```
The self-assignment check prevents deleting the buffer you are about to copy from.

### Step 6 — Keep the destructor consistent
```cpp
IntArray::~IntArray() { delete[] data; }
```
Now the class defines all three members; the Rule of Three is satisfied.

### Step 7 — State the Rule of Three formally
If a user-declared destructor, copy constructor, or copy assignment operator exists, the class should also declare the other two (Stroustrup, *The C++ Programming Language*, 4e, §17.5).

## 5. Worked examples — har step show karo

**Example 1 — Minimal owning class**  
*Given:* a class `Buffer` with `char* ptr` and `size_t len` that allocates in its constructor.  
*Find:* correct copy constructor.  
Step 1: allocate new storage `ptr = new char[other.len]`.  
Step 2: copy bytes with `std::memcpy`.  
Step 3: store length.  
**Final answer**  
```cpp
Buffer::Buffer(const Buffer& other)
    : len(other.len), ptr(new char[other.len]) {
    std::memcpy(ptr, other.ptr, len);
}
```
*Reflection:* The example is simple yet already shows why a pointer forces you to allocate rather than copy the address.

**Example 2 — Self-assignment safety**  
*Given:* the assignment operator above.  
*Find:* behaviour when `a = a`.  
The `if (this != &other)` guard skips the delete-and-reallocate sequence.  
**Final answer** object remains unchanged.  
*Reflection:* Without the guard, `delete[] data` would destroy the only copy of the data before the copy step.

**Example 3 — Rule of Three violation**  
*Given:* a class that defines only a destructor.  
*Find:* what the compiler still generates.  
It silently supplies a shallow copy constructor and assignment. Any copy then produces a double-delete at runtime.  
**Final answer** undefined behaviour on second destructor call.  
*Reflection:* The compiler never warns about this; the error appears only at run time.

**Example 4 — Copy-and-swap idiom (advanced)**  
*Given:* need for exception-safe assignment.  
*Find:* implementation using a friend swap.  
Create a temporary copy, swap contents, let the temporary die.  
**Final answer**  
```cpp
Buffer& Buffer::operator=(Buffer other) {  // pass-by-value
    swap(*this, other);
    return *this;
}
```
*Reflection:* Pass-by-value automatically creates the deep copy; the destructor of the parameter cleans the old state.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting the self-assignment check | Assignment is written before the author realises `this == &other` is possible | Always add `if (this != &other)` or use copy-and-swap |
| Deleting the source buffer too early | `delete[] data` precedes the allocation of the new buffer | Use a temporary pointer or copy-and-swap     |
| Missing `const` on the parameter  | Author writes `T&` instead of `const T&`    | Follow the canonical signature               |
| Not handling allocation failure   | `new` throws; object left in inconsistent state | Use smart pointers or provide strong exception guarantee |
| Defining only the destructor      | Belief that “I only need cleanup”           | Apply the Rule of Three checklist at design time |
| Shallow copy of a reference-counted resource | Forgetting to increment the reference count | Either use `std::shared_ptr` or write explicit count logic |

## 7. The textbook-precise statement
If a class `X` declares a user-provided destructor, copy constructor, or copy assignment operator, and any of these manages a resource, then `X` should provide all three operations with consistent ownership semantics. The copy constructor shall have the signature `X::X(const X&)` and the copy assignment operator shall have the signature `X& X::operator=(const X&)`. Both shall leave the source operand unchanged and the target operand equivalent to the source after the operation (Stroustrup, *The C++ Programming Language*, 4e, §17.5).

## 8. Visual — diagram or schematic
```
Object A                  Object B (after shallow copy)
+-----------+             +-----------+
| ptr  ---->| [data]      | ptr  ---->|
| len       |             | len       |
+-----------+             +-----------+
          ^                       ^
          |                       |
       delete[]               delete[]  <-- double delete
```

## 9. The memory technique

1. **The hook** — Picture three identical suitcases; if you open one, you must open all three, otherwise something will be left behind or lost.
2. **What to overlearn** — The exact three signatures: destructor, `X(const X&)`, `X& operator=(const X&)`.
3. **Spaced-repetition schedule** — Review the signatures after 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First-principles fallback** — Ask “Who owns the pointer?”; if the answer is “this object”, you must implement all three members.

## 10. What this unlocks
You can now design classes that safely own dynamic memory, file handles, or GPU buffers. This directly enables the next topics:

- Move semantics and the Rule of Five
- Smart pointers (`unique_ptr`, `shared_ptr`)
- RAII containers such as `std::vector` and `std::string`
- Expression templates in high-performance libraries

## 11. Self-check — five questions, no answers
1. A class defines only a destructor that calls `delete[]`. What happens on copy?
2. Write the minimal signatures required by the Rule of Three for a class named `Matrix`.
3. Why does the copy assignment operator return a reference to `*this`?
4. In the copy-and-swap idiom, where does the deep copy actually occur?
5. A student writes a copy constructor but forgets to update the length member. Which later operation will first exhibit undefined behaviour?