## 1. The one-sentence answer
**The Rule of Five states that if a C++ class manages a resource and therefore defines any one of the destructor, copy constructor, or copy assignment operator, it must also define the move constructor and move assignment operator to enable efficient resource transfer instead of expensive copies.**

Resource-owning classes such as those holding raw pointers to heap memory perform deep copies by default when the compiler-generated operations are used. These copies duplicate the underlying data even when the source object is about to disappear, wasting both time and memory. Move operations instead steal the pointer and null the source, leaving the source in a valid but empty state; this transfer costs only a handful of assignments.

When any special member that deals with ownership is user-written, the compiler suppresses the others, so an incomplete set produces either deep-copy overhead or, worse, double-delete bugs. Defining all five together restores both correctness and performance.

> [!NOTE]
> The decisive insight is that an rvalue signals “I am temporary and will die soon,” so its resources may be stolen rather than duplicated; the Rule of Five simply makes that permission explicit for every ownership operation.

## 2. Why this matters — concrete and current
In the LLVM/Clang codebase the `SmallVector` class implements the full Rule of Five so that temporary vectors arising during template instantiation can donate their inline or heap buffers in constant time; without the move members, every AST node construction would copy kilobytes of memory.

High-frequency trading engines at Jane Street rely on move-only types such as `OrderBook` snapshots; the move assignment allows an updated book to replace the previous one inside a lock-free ring buffer without ever allocating or copying the price ladder arrays.

The TensorFlow runtime uses `tensorflow::Tensor` objects that own device memory buffers. Move construction lets GPU tensors be returned from device-placement functions without an extra host-to-device copy, directly affecting training throughput on clusters measured in petaflops.

Inside the Linux kernel’s eBPF verifier, the C++ frontend that generates BPF bytecode employs move semantics on `Instruction` vectors so that the final emitted program can be assembled from many small fragments without quadratic copying.

The Eigen linear-algebra library’s `Matrix` template supplies move operations so that expression-template temporaries arising from `A = B + C + D` are moved rather than copied, preserving the library’s claim of “no unnecessary temporaries” on every major release.

## 3. Mental prerequisites

| Concept                    | Why you need it here                                                                 |
|----------------------------|--------------------------------------------------------------------------------------|
| Lvalue vs rvalue            | Move operations are enabled only for rvalues; the distinction decides which overload is chosen. |
| RAII and destructors        | Move leaves the source valid so its destructor can run safely; understanding ownership is required. |
| Compiler-generated members  | Knowing when the compiler suppresses defaults explains why the Rule of Five exists.   |
| Pointer aliasing and delete | Move must null the source pointer to avoid double-delete; the mechanics rest on this rule. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Distinguish lvalues from rvalues
An lvalue has a persistent identity you can take the address of; an rvalue does not.  
```cpp
int a = 5;          // a is lvalue, 5 is rvalue
std::string s = a;  // copy from lvalue
std::string t = std::string("hi"); // move from rvalue
```
Formally, an expression `E` is an xvalue (hence movable) when it is a cast to rvalue reference or a temporary.  
> [!WARNING]
> Treating an lvalue as an rvalue with `std::move` on a variable still in use produces a moved-from object whose subsequent reads are legal but whose resources have vanished.

### Step 2 — Observe the cost of an implicit copy
When a class holds a pointer to heap data, the synthesized copy constructor allocates and duplicates that data.  
```cpp
class Buffer { char* p; std::size_t n; ... };
Buffer b1(1000000);
Buffer b2 = b1; // O(n) allocation and memcpy
```
The formal cost is therefore linear in the resource size, not constant.

### Step 3 — Introduce rvalue references
Declare a constructor that accepts `T&&`; it binds only to rvalues.  
```cpp
Buffer(Buffer&& other) noexcept;
```
This overload is chosen by overload resolution precisely when the argument is an rvalue.

### Step 4 — Implement the move constructor
Steal the pointer, null the source, and leave the source empty but destructible.  
```cpp
Buffer(Buffer&& other) noexcept
    : p(other.p), n(other.n) { other.p = nullptr; other.n = 0; }
```
The `noexcept` guarantee lets containers relocate objects without strong-exception-safety overhead.

### Step 5 — Implement the move assignment operator
Release existing resources, then steal from the source exactly as the move constructor does, guarding against self-assignment.  
```cpp
Buffer& operator=(Buffer&& other) noexcept {
    if (this != &other) {
        delete[] p;
        p = other.p; n = other.n;
        other.p = nullptr; other.n = 0;
    }
    return *this;
}
```

### Step 6 — State the Rule of Five
If any of the five special members—destructor, copy constructor, copy assignment, move constructor, move assignment—is user-declared, the remaining four must also be user-declared to maintain both correctness and efficiency.  
This is the textbook formulation that replaces the older Rule of Three once move semantics entered the language.

## 5. Worked examples — every step shown

**Example 1 — Minimal move-only buffer**  
*Given:*  
```cpp
class Buffer {
    char* p; std::size_t n;
public:
    Buffer(std::size_t size) : p(new char[size]), n(size) {}
    ~Buffer() { delete[] p; }
};
```
*Find:* Add move members so that `Buffer b2 = std::move(b1);` transfers ownership.  
Step 1: declare `Buffer(Buffer&&) noexcept;`  
*Why* — overload resolution must see an rvalue reference.  
Step 2: implement stealing and nulling.  
*Why* — prevents double-delete.  
Step 3: add move assignment symmetrically.  
*Why* — assignment from temporary must also be cheap.  
**Final answer**  
```cpp
Buffer(Buffer&& o) noexcept : p(o.p), n(o.n) { o.p = nullptr; }
Buffer& operator=(Buffer&& o) noexcept {
    if (this != &o) { delete[] p; p = o.p; n = o.n; o.p = nullptr; }
    return *this;
}
```

**Example 2 — Rule of Five with copy retained**  
*Given:* The same `Buffer` now needs a copy constructor for legacy code.  
*Find:* Supply all five members.  
Every step mirrors the previous example plus the deep-copy versions; the presence of any one forces explicit definition of the other four.  
**Final answer**  
All five members are written; the move pair remain `noexcept`.

**Example 3 — Self-assignment guard**  
*Given:* `b = std::move(b);`  
*Find:* Show the guard prevents delete of the live resource.  
The identity check `if (this != &other)` is evaluated before any `delete`.  
**Final answer**  
Guard present; object remains valid.

**Example 4 — Container relocation**  
*Given:* `std::vector<Buffer> v; v.push_back(Buffer(100));`  
*Find:* Demonstrate that the move constructor is invoked, not the copy.  
`push_back` receives an rvalue, selects the move overload, and the internal reallocation may also move elements when capacity grows.  
**Final answer**  
Only one allocation occurs; the temporary’s buffer is stolen.

*Reflection*  
Each example grows by adding an operation that interacts with ownership; the pattern that generalises is “steal, null, and guard.”

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Forgetting to null the source pointer | Move constructor written but source left pointing at stolen memory | Always set source pointers to `nullptr` before exit  |
| Declaring move members without `noexcept` | Container relocation paths refuse to move when not `noexcept` | Mark every move operation `noexcept` by default      |
| Implementing only move constructor | Rule of Five violation silently deletes copy operations | Count the five members whenever any is user-written  |
| Self-assignment without check     | Move assignment deletes the object’s own resource   | Insert identity test before releasing resources      |
| Returning local object by value without move | Copy elision not triggered in all ABIs              | Rely on guaranteed copy elision (C++17) or explicit `std::move` only when needed |
| Mixing raw `new[]`/`delete` with containers | Move leaves dangling pointers inside container      | Prefer `std::vector` or smart pointers as members    |
| Copying inside move constructor   | Accidental call to copy constructor via `T(other)`  | Use member-initializer list that names the rvalue reference parameter directly |

## 7. The textbook-precise statement
If a class `T` defines any of the following, it shall define all five: destructor, copy constructor, copy assignment operator, move constructor, and move assignment operator (ISO/IEC 14882:2020, [class.copy.ctor] and [class.copy.assign]). The move constructor and move assignment shall leave the operand in a valid but unspecified state and shall be `noexcept` whenever possible. Reference: Stroustrup, *The C++ Programming Language*, 4e, §17.5.

## 8. Visual — diagram or schematic
```text
Before move:
  src ──► [heap block of length N]
  dst ──► [uninitialized]

After move constructor:
  src ──► nullptr
  dst ──► [heap block of length N]   (pointer stolen, length copied)

After move assignment (non-self):
  dst releases its old block
  dst ──► [heap block of length N]
  src ──► nullptr
```
The diagram shows pointer transfer and nulling; no allocation occurs on the destination side.

## 9. The memory technique
1. **The hook** — Picture five fingers on one hand; each finger must wear the same glove of ownership logic, otherwise the hand (the class) drops resources.  
2. **What to overlearn** — The exact five members, the `noexcept` requirement on moves, and the null-after-steal idiom.  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive by asking: “If this object owns a pointer, what must happen on copy, on move, and on destruction?” The answers force the five definitions.

## 10. What this unlocks
Mastery of the Rule of Five lets you write high-performance value types that integrate seamlessly with STL containers and algorithms.  

- Next: perfect forwarding and `std::forward`  
- Next: `std::unique_ptr` and move-only types  
- Next: `noexcept` contract design for containers  
- Next: copy elision and return-value optimization guarantees  

## 11. Self-check — five questions, no answers
1. Write the signatures of the five special members for a class that owns a single `int*`.  
2. A move constructor is declared but not marked `noexcept`; what concrete performance consequence appears inside `std::vector`?  
3. Demonstrate with four lines of code that `v.push_back(std::move(x))` may invoke either the move constructor or the copy constructor depending on `x`’s type.  
4. Identify the bug: a move assignment operator that performs `delete[] p; p = other.p;` without an identity test.  
5. Given a class that already defines a user-provided destructor, list every additional member the Rule of Five now obliges you to write.