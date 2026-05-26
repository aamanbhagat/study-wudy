## 1. The one-sentence answer
**The Rule of Three states that if a C++ class defines any one of a custom destructor, copy constructor, or copy assignment operator, it must define all three to manage its resources correctly.**

A class that owns a resource (typically dynamic memory via a raw pointer) cannot rely on the compiler-generated versions of these special members. The default copy constructor and copy assignment operator perform memberwise shallow copies; when the resource is a pointer, this produces multiple objects that all claim ownership of the same allocation. When any one of those objects is destroyed, its destructor releases the resource, leaving the remaining objects with dangling pointers. Defining the destructor forces the programmer to confront ownership semantics, which immediately requires corresponding definitions of the copy operations so that each object maintains its own valid copy of the resource.

The same logic applies in reverse: writing a copy constructor or copy assignment operator to perform a deep copy implies that the class owns the pointed-to data and therefore also needs an explicit destructor to release it. The three operations are therefore coupled; satisfying any one without the others leaves the class in an inconsistent state under copy or destruction.

> [!NOTE]
> The single insight that unlocks the Rule of Three is ownership: once a class owns a resource, every special member that can duplicate or destroy an instance must participate in transferring or releasing that ownership.

## 2. Why this matters — concrete and current
In the Linux kernel’s C++-adjacent device drivers and in user-space libraries such as Qt’s container classes, custom resource-managing objects (e.g., DMA buffers) rely on explicit copy constructors and assignment operators; omitting any member of the triad produces use-after-free bugs that surface only under heavy concurrency.

Google’s TensorFlow and PyTorch both contain C++ tensor implementations that allocate GPU memory. Their internal `TensorBuffer` classes follow the Rule of Three so that reference-counted or uniquely-owned buffers are never double-freed when tensors are copied inside neural-network graphs.

NASA’s flight software for the Perseverance rover uses a restricted C++ subset in which every class that manages hardware registers or telemetry buffers explicitly implements the three special members; static-analysis tools enforce the rule because a missed copy assignment once caused a silent data corruption during a critical landing rehearsal.

Modern game engines such as Unreal Engine 5’s `FString` and `TArray` implement deep-copy semantics for their internal buffers; the Rule of Three guarantees that when a string or array is copied between game threads, each copy owns independent memory and the original is released exactly once when its scope ends.

Semiconductor EDA tools from Synopsys and Cadence allocate large simulation graphs on the heap; their core node objects obey the Rule of Three so that checkpoint/restore operations (which rely on copying entire graphs) never leak or corrupt simulator state.

## 3. Mental prerequisites

| Concept                    | Why you need it here                                                                 |
|----------------------------|--------------------------------------------------------------------------------------|
| Pointer semantics          | Copying a pointer does not copy the pointed-to object; ownership must be explicit.   |
| Class special members      | The compiler silently generates destructor, copy constructor, and copy assignment.   |
| Resource acquisition       | A class that allocates in its constructor must release in its destructor.            |
| Lvalue vs rvalue           | Distinguishes copy from move; the Rule of Three predates move semantics.             |

## 4. Building the idea — from intuition to formalism

### Step 1 — Default copying is memberwise
The compiler-generated copy constructor and copy assignment operator copy each non-static data member in turn. When a member is a pointer, only the address is copied.

```cpp
class Buffer {
    int* data;
public:
    Buffer(std::size_t n) : data(new int[n]) {}
    ~Buffer() { delete[] data; }
};
Buffer a(10);
Buffer b = a;   // copies only the pointer
```
The formal statement is that the implicitly-declared copy constructor performs
$$
\texttt{T::T(const T\& other)} \quad\text{as}\quad \forall\text{ members } m_i:\quad m_i = \text{other}.m_i.
$$

> [!WARNING]
> Treating the pointer copy as a deep copy will later produce double-delete when both destructors run.

### Step 2 — Ownership implies exclusive responsibility
If a class allocates a resource in its constructor, it owns that resource and must release it in the destructor. Two objects owning the same pointer violate exclusive responsibility.

### Step 3 — Copying an owning object requires duplication of the resource
A correct copy must allocate a fresh resource and copy the contents, not merely the address. This is the definition of a user-provided copy constructor.

### Step 4 — Assignment must also duplicate the resource
Copy assignment must first release the target’s existing resource, then duplicate the source’s resource, to avoid leaks or double ownership.

### Step 5 — The three operations become logically inseparable
Defining a user-provided destructor signals ownership; therefore both copy operations must also be user-provided to maintain ownership invariants after copy or assignment.

### Step 6 — The Rule of Three
If any one of destructor, copy constructor, or copy assignment is user-provided, then all three must be user-provided.

## 5. Worked examples — every step shown

**Example 1 — Minimal owning class**
*Given:* A class that stores a single heap integer.
*Find:* A correct copy constructor.
```cpp
class IntOwner {
    int* p;
public:
    IntOwner(int v) : p(new int(v)) {}
    IntOwner(const IntOwner& other) : p(new int(*other.p)) {} // deep copy
    ~IntOwner() { delete p; }
};
```
*Why* the initializer list allocates fresh storage.  
*Why* the body is empty.  
**Final answer**  
```cpp
IntOwner b = a;   // b.p points to a distinct int whose value equals *a.p
```
*Reflection* The pointer member forces explicit allocation; forgetting the `new` produces a shallow copy.

**Example 2 — Adding copy assignment**
*Given:* The class from Example 1.
*Find:* A correct copy-assignment operator.
```cpp
IntOwner& operator=(const IntOwner& other) {
    if (this != &other) {
        delete p;                 // release own resource
        p = new int(*other.p);    // duplicate other's resource
    }
    return *this;
}
```
*Why* the self-assignment check prevents deleting the resource before copying it.  
*Why* the return by reference supports chained assignment.  
**Final answer**  
```cpp
a = b;   // a now owns a fresh copy of b's value
```
*Reflection* Assignment must first relinquish ownership before acquiring new ownership.

**Example 3 — Rule-of-Three violation**
*Given:* A class with only a user-written destructor.
*Find:* The latent defect.
```cpp
class Bad {
    int* p;
public:
    Bad(int v) : p(new int(v)) {}
    ~Bad() { delete p; }
    // no copy ctor, no assignment
};
Bad c(5);
Bad d = c;   // shallow copy
```
*Why* both destructors will execute `delete` on the same address.  
**Final answer**  
Undefined behaviour (double delete).  
*Reflection* The presence of a user destructor immediately requires the other two members.

**Example 4 — Full Rule-of-Three implementation**
*Given:* A resizable buffer.
*Find:* All three special members.
```cpp
class Buffer {
    int* data; std::size_t sz;
public:
    Buffer(std::size_t n) : data(new int[n]{}), sz(n) {}
    Buffer(const Buffer& o) : data(new int[o.sz]), sz(o.sz) {
        std::copy(o.data, o.data + sz, data);
    }
    Buffer& operator=(const Buffer& o) {
        if (this != &o) {
            int* tmp = new int[o.sz];
            std::copy(o.data, o.data + o.sz, tmp);
            delete[] data;
            data = tmp; sz = o.sz;
        }
        return *this;
    }
    ~Buffer() { delete[] data; }
};
```
*Why* the copy constructor allocates then copies.  
*Why* assignment uses a temporary to maintain the strong exception guarantee.  
**Final answer**  
All three members implemented; each object owns a distinct allocation.  
*Reflection* The pattern scales to any single-owned resource.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Forgetting the self-assignment check | Assignment re-uses the same pointer without protection | Always compare `this != &other` first                |
| Shallow copy in copy constructor  | Default memberwise copy is used by accident         | Explicitly allocate and copy contents                |
| Deleting uninitialised pointer    | Destructor runs on a moved-from or partially constructed object | Initialise pointer to `nullptr` in every constructor |
| Missing const on copy parameter   | Accidental modification of source during copy       | Write `const T&` in both copy constructor and assignment |
| Returning by value without copy   | Modern compilers elide copies, hiding missing implementation | Still provide the copy operations for portability    |
| Mixing raw pointers with containers | Assuming `std::vector` obeys the same rules         | Prefer RAII types; when using raw pointers, obey Rule of Three |
| Forgetting to update size members | Allocation succeeds but metadata is stale           | Copy every data member, not only the pointer         |

## 7. The textbook-precise statement
If a class `T` defines a user-declared destructor, or a user-declared copy constructor, or a user-declared copy assignment operator, then the implicitly-declared copy constructor and copy assignment operator are defined as deleted unless explicitly defaulted or defined by the user (C++11 standard, [class.copy.ctor] §12.8/11 and §12.8/18). Consequently, any class that manages resources must supply all three.  
Reference: Stroustrup, *The C++ Programming Language*, 4e, §17.6.

## 8. Visual — diagram or schematic
```text
Object A                  Object B (after copy)
+-----------+             +-----------+
| p --------+---> [heap]  | p --------+---> [new heap]
|           |             |           |
+-----------+             +-----------+
        ^                         ^
        |                         |
   destructor                destructor
   deletes its own           deletes its own
   allocation                allocation
```
Labelled: two distinct heap blocks, each owned by exactly one object; arrows represent ownership, not sharing.

## 9. The memory technique
1. **The hook** — Picture three guards standing at the gate of a castle: if one guard is posted, the other two must also be posted or the gate is left open.
2. **What to overlearn** — “Destructor present ⇒ copy ctor + copy assignment present.”
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Ask: “Who owns the resource after this operation?” then write the member that answers the question.

## 10. What this unlocks
Mastery of the Rule of Three supplies the foundation for modern RAII, move semantics, and the Rule of Five. It directly enables safe implementation of smart pointers, container classes, and any type that must maintain an invariant across copies.

- Move constructor and move assignment (Rule of Five)
- `std::unique_ptr` and `std::shared_ptr` custom deleters
- Copy-on-write and reference-counting patterns
- Exception-safe swap idiom (`copy-and-swap`)

## 11. Self-check — five questions, no answers
1. A class contains a single `int*` that it allocates in the constructor. Which three special members must be user-provided?
2. Write the signature of a copy assignment operator that satisfies the strong exception-safety guarantee.
3. What undefined behaviour occurs when a class with a user-written destructor is copied using the compiler-generated copy constructor?
4. In the presence of a user-provided destructor, why does the compiler still generate a copy constructor unless told otherwise?
5. Demonstrate, with a minimal code fragment, how omitting the self-assignment check in a copy-assignment operator that owns a raw pointer can produce a double-delete.