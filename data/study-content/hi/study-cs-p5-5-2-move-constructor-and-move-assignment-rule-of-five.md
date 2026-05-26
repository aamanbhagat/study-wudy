## 1. The one-sentence answer

**Move constructor and move assignment let a class transfer resources from a temporary (rvalue) object instead of copying them, and the Rule of Five says that if you explicitly define any one of the five special member functions then you must consider defining all five.**

Jab aap ek class banate ho jo heap memory ya file handles jaise resources manage karti hai, toh copy karna costly padta hai. Move operations sirf pointers swap kar dete hain, jo O(1) hota hai. Iska matlab yeh hai ki jab function se temporary object return hota hai, toh compiler move constructor use karke resources chura sakta hai bina extra allocation ke. Rule of Five isliye exist karta hai kyunki ek special function define karne se compiler baaki default versions ko suppress kar deta hai, aur aapka class incomplete ban jaata hai.

Agar aap sirf destructor likh dete ho, toh copy constructor aur copy assignment bhi khud se banenge lekin move versions nahi. Isse performance loss hota hai aur kabhi-kabhi bugs bhi. Rule of Five ensure karta hai ki move semantics properly integrate ho jaayein jab aap resource management khud handle kar rahe ho.

> [!NOTE]
> The single most important insight is that move operations do not “steal” in the moral sense; they simply transfer ownership of a resource that the source object no longer needs because it is about to die.

## 2. Why this matters — concrete and current

In the LLVM compiler infrastructure, move constructors are used inside the `SmallVector` class so that temporary IR nodes created during optimisation passes can be moved into the final instruction list without reallocating memory on every transformation step.

Google’s TensorFlow runtime relies on move assignment inside its `Tensor` and `TensorBuffer` classes; when a GPU kernel finishes and returns a temporary tensor, the move operation lets the framework transfer the underlying device memory pointer instead of copying gigabytes of data back to the host.

In the Unreal Engine 5 rendering pipeline, `FTextureResource` objects are moved when a level streams in new assets; the move assignment guarantees that the DirectX texture handle is transferred in constant time while the old object’s destructor safely skips any deallocation.

The C++ standard library’s `std::unique_ptr` and `std::vector` both implement move operations; when an algorithm such as `std::sort` internally creates temporary vectors, the moves prevent quadratic blow-up that would occur with only copies.

In semiconductor design tools at companies such as Synopsys, the core netlist data structures use custom move constructors so that multi-gigabyte circuit graphs can be reorganised during place-and-route without exhausting RAM.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| RAII                     | Move operations are the mechanism that lets RAII classes transfer ownership safely.   |
| lvalue vs rvalue         | You must recognise when an object is an rvalue so the compiler can select the move path. |
| Rule of Three            | The older rule shows what happens when you only manage copies and destruction; Rule of Five extends it to moves. |
| `noexcept`               | Move operations should usually be `noexcept` so containers can use them during reallocation without risking strong exception safety. |

If any row above feels unfamiliar, pause and review that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Recognise expensive copies
A class that owns a pointer to heap memory pays for allocation and deallocation on every copy.  
Example: a simple `Buffer` holding a `char*` and a length. Copying it calls `new[]` and `memcpy`.  
Formal statement: given an object `x` of type `T` that manages a resource `R`, the cost of `T y = x;` is proportional to the size of `R`.

> [!WARNING]
> If you later add a move constructor but forget to update the copy constructor, the class will still copy on every lvalue, silently destroying the performance gain you intended.

### Step 2 — Introduce rvalue references
C++11 added `T&&` so a function can declare that it accepts only temporaries.  
Example: `void consume(Buffer&& tmp);` can be called with `consume(createBuffer());` but not with a named variable.  
Formal: an rvalue reference binds only to rvalues, allowing the callee to modify the object knowing its lifetime is about to end.

### Step 3 — Write the move constructor
The move constructor takes an rvalue reference and transfers the resource pointer, leaving the source in a valid but empty state.  
Example: `Buffer(Buffer&& other) : data(other.data), size(other.size) { other.data = nullptr; other.size = 0; }`.  
Formal: `T(T&& other) noexcept;` must leave `other` in a state where its destructor is harmless.

### Step 4 — Write the move assignment operator
Move assignment must first release its own resource, then steal the source’s resource, and finally leave the source empty.  
Example: `Buffer& operator=(Buffer&& other) noexcept { if (this != &other) { delete[] data; data = other.data; … other.data = nullptr; } return *this; }`.  
Formal: `T& operator=(T&& other) noexcept;` must be self-assignment safe and `noexcept`.

### Step 5 — State the Rule of Five
If any of the following is user-declared then all five should be considered: destructor, copy constructor, copy assignment, move constructor, move assignment.  
Formal: once a user declares any of these, the implicit declarations of the others are suppressed.

### Step 6 — Compiler generation rules
When no user-declared copy/move/destructor exists, the compiler generates all five as defaulted. Declaring a destructor suppresses the move operations but not the copies.  
Formal (C++11 [class.copy.ctor]/8–11): the conditions under which each special member is implicitly defined or deleted.

## 5. Worked examples — har step show karo

**Example 1 — Minimal move constructor**  
*Given:* a `Buffer` class with raw pointer.  
*Find:* implement only the move constructor.  
```
Buffer(Buffer&& other) noexcept
  : data(other.data), size(other.size) {
    other.data = nullptr;
    other.size = 0;
}
```
*Why* we set `other.data` to `nullptr`: so the source destructor will not delete the memory we just took.  
**Final answer**  
```cpp
Buffer(Buffer&& other) noexcept : data(other.data), size(other.size) { other.data = nullptr; other.size = 0; }
```
*Reflection:* the example is simple yet already shows the “nullify source” pattern that every later move operation must follow.

**Example 2 — Move assignment with self-check**  
*Given:* the same `Buffer`.  
*Find:* implement move assignment.  
```
Buffer& operator=(Buffer&& other) noexcept {
    if (this != &other) {
        delete[] data;
        data = other.data;
        size = other.size;
        other.data = nullptr;
        other.size = 0;
    }
    return *this;
}
```
*Why* the self-check exists: without it an object moved to itself would delete its own data.  
**Final answer**  
```cpp
Buffer& operator=(Buffer&& other) noexcept { … }
```
*Reflection:* the pattern of “release, transfer, nullify” generalises to any resource.

**Example 3 — Rule of Five in practice**  
*Given:* a class that already has a user-written destructor.  
*Find:* add the four other functions so the class obeys the rule.  
We must supply copy constructor, copy assignment, move constructor and move assignment; otherwise the compiler will not generate moves.  
**Final answer**  
All five functions are explicitly written or defaulted together.

**Example 4 — Using `std::move`**  
*Given:* two `Buffer` objects `a` and `b`.  
*Find:* move contents of `a` into `b`.  
```
b = std::move(a);
```
*Why* `std::move` is needed: a named variable is an lvalue; `std::move` casts it to an rvalue reference so the move assignment is chosen.  
**Final answer**  
```cpp
b = std::move(a);
```
*Reflection:* `std::move` does not move anything; it only changes the value category so overload resolution selects the move path.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Forgetting to nullify source pointer | Source destructor still deletes the moved resource | Always set pointer members to `nullptr` in every move operation |
| Declaring only a destructor       | Compiler suppresses moves but keeps copies          | After writing a destructor, explicitly default or write the two moves |
| Missing `noexcept` on moves       | `std::vector` refuses to use throwing moves         | Mark every move constructor and assignment `noexcept` |
| Self-assignment in move operator  | Object deletes its own resource before stealing     | Add `if (this != &other)` guard                      |
| Returning a local by value without move | Copy instead of move occurs                         | Rely on NRVO or explicitly `return std::move(x);` only when necessary |
| Mixing `const T&` and `T&&` overloads incorrectly | Ambiguity or unwanted copies                        | Prefer a single `T&&` overload for sink parameters   |
| Not updating documentation        | New team members do not know the class is move-only | Document the post-move state of the source object    |

## 7. The textbook-precise statement

From Scott Meyers, *Effective Modern C++*, 1e, Item 17:  
“Declare the move constructor and move assignment operator together with the copy constructor, copy assignment operator, and destructor (the ‘Rule of Five’). If you declare any of these five functions, you should normally declare all five. The compiler will generate neither move operations nor copy operations if you declare a destructor, a copy operation, or a move operation.”

## 8. Visual — diagram or schematic

```text
Before move:
src ──► [heap block 0x1000]   dst ──► [uninitialised]

After move constructor:
src ──► nullptr               dst ──► [heap block 0x1000]
```

## 9. The memory technique

1. **The hook** — picture five fingers on one hand; each finger is one special member; if you paint any finger you must paint all five or the hand looks broken.
2. **What to overlearn** — the exact post-condition of a moved-from object: “valid but unspecified, destructor must be safe, no resource leaks.”
3. **Spaced-repetition schedule** — review the Rule of Five statement on day 1, day 3, day 7, day 16 and day 35.
4. **First-principles fallback** — start from “who owns the resource?”; the owner that is about to die can give ownership away; therefore the move constructor must both receive ownership and revoke it from the dying object.

## 10. What this unlocks

Once you master move semantics you can write high-performance containers, understand `std::unique_ptr` and `std::optional`, and correctly implement allocators and custom string classes.

- Next topics: copy elision, NRVO, `std::move_only_function`, and perfect forwarding with `std::forward`.
- You will also be ready for the Rule of Zero and how modern C++ encourages letting the compiler generate all five members.

## 11. Self-check — five questions, no answers

1. Write the signatures of all five special member functions for a class that owns a single `int*`.
2. What happens to the implicitly generated move constructor if a user declares a destructor but no other special member?
3. Why must move assignment usually be marked `noexcept`?
4. Show the shortest correct implementation of move assignment for a class that also needs a user-defined destructor.
5. Identify the bug: a move constructor that forgets to set the source pointer to `nullptr` and then returns control to the caller.