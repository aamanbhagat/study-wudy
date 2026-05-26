## 1. The one-sentence answer
**Constructors are special member functions that initialize objects of a class, with distinct forms—default, parameterized, copy, and delegating—each governing a different initialization path.**

An object in C++ is not merely allocated memory; it must reach a valid, usable state before any other member function may be invoked. The language therefore supplies a family of constructors that the compiler selects according to the syntactic form of the declaration. The default constructor is invoked when no arguments are supplied, the parameterized constructor accepts explicit values that shape the object’s internal state, the copy constructor produces a new object from an existing one of the same type, and a delegating constructor hands part of its work to another constructor of the same class.

These four forms together eliminate the need for separate “init” routines and guarantee that every object begins life with a determinate value. Because the choice among them is made at compile time by overload resolution, a programmer who understands the selection rules can predict exactly which code will run for any given declaration.

> [!NOTE]
> The copy constructor is the only constructor that can be called implicitly by the language itself; all others require an explicit syntactic cue, which is why a missing or incorrect copy constructor silently produces shallow copies that later cause double-delete or data races.

## 2. Why this matters — concrete and current
Unreal Engine 5’s UObject system relies on a default constructor to allocate every actor and component; the engine then immediately invokes a parameterized constructor that receives spawn parameters from the level editor, ensuring that every replicated object is valid on both server and client before the first tick.

Google’s TensorFlow runtime builds large tensor buffers with a copy constructor that performs reference-counted sharing of the underlying storage; when a tensor is returned from a C++ kernel to Python, the copy constructor’s reference-count increment prevents premature deallocation during graph execution.

NASA’s flight-software framework cFS uses delegating constructors to factor common initialization of telemetry packets; the base packet constructor sets the CCSDS header while each derived science-packet constructor delegates to it before adding its own payload checksum, reducing duplicated code that must be reviewed for DO-178C certification.

High-frequency trading platforms at Jane Street initialize order-book objects with a parameterized constructor that pre-allocates a fixed-size ring buffer; the same class also supplies a copy constructor that performs a deep copy only when an order is modified, avoiding the latency of unnecessary allocations on the hot path.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Class definition     | Supplies the type whose objects constructors will initialize |
| Reference types      | Required for the copy-constructor parameter (T const&)    |
| Member initializer lists | The only place constructors may initialize const or reference members |
| Overload resolution  | Determines which constructor is chosen for a given declaration |

## 4. Building the idea — from intuition to formalism

### Step 1 — Every object must be born valid
An object’s bits are not automatically meaningful; the programmer must supply code that establishes invariants before the object is observable.  
```cpp
class Vec { int x, y; };
Vec v;          // bits are indeterminate
```
Formally, if a class has no user-declared constructor, the compiler generates a default constructor that leaves members uninitialized (for non-class types).  
> [!WARNING]  
> Reading an uninitialized scalar member yields undefined behavior; the compiler’s generated default constructor does not zero memory.

### Step 2 — Parameterized constructors accept values at birth
A constructor may declare parameters that become the initial values of members.  
```cpp
Vec(int a, int b) : x(a), y(b) {}
```
The call `Vec v(3,4);` binds the arguments before any member is read.  
> [!WARNING]  
> Writing assignments inside the constructor body instead of the initializer list may read uninitialized members or violate const-correctness.

### Step 3 — The copy constructor duplicates an existing object
When an object of type T is used to initialize another T, the copy constructor `T(T const&)` is selected.  
```cpp
Vec(Vec const& other) : x(other.x), y(other.y) {}
```
This rule is expressed by the language as: if the initializer is a glvalue of the same type (or derived type), overload resolution prefers the copy constructor.  
> [!WARNING]  
> Omitting the copy constructor causes the compiler to generate a member-wise copy that shares pointers, producing shallow-copy bugs.

### Step 4 — Delegating constructors factor common work
One constructor may delegate to another of the same class using the mem-initializer syntax `T(args)`.  
```cpp
Vec() : Vec(0,0) {}           // delegates to parameterized ctor
```
Delegation must be the only item in the initializer list; mixing it with other initializers is ill-formed.  
> [!WARNING]  
> Infinite delegation (A calls B, B calls A) is diagnosed at compile time, but a cycle that spans multiple overloads can still produce surprising diagnostics.

### Step 5 — The four forms coexist via overload resolution
The compiler builds an overload set containing every declared constructor; the best match for the syntactic form of the declaration is chosen.  
```cpp
Vec v;          // default
Vec v2(1,2);    // parameterized
Vec v3 = v2;    // copy
```
No two constructors may have identical parameter lists; otherwise the program is ill-formed.  
> [!WARNING]  
> A constructor taking a single argument of the same type is a copy constructor only when the argument is a reference; a by-value parameter would be a different overload and would itself require a copy.

### Step 6 — Textbook statement
A constructor is a member function with the same name as its class and no return type. Exactly one of the four forms—default, parameterized, copy, or delegating—is invoked for every object definition according to the rules of overload resolution and the presence or absence of user declarations (ISO/IEC 14882:2020, §11.4.5).

## 5. Worked examples — every step shown

**Example 1 — Default constructor**  
*Given:*  
```cpp
class Point { int x{}, y{}; };
Point p;
```  
*Find:* the state of `p`.  
- The compiler sees no user constructor, therefore generates `Point::Point()`.  
- Member initializers `x{}` and `y{}` run, zero-initializing both members.  
- `p.x == 0 && p.y == 0`.  
**Final answer**  
`p` is the origin.  
*Reflection:* The empty braces inside the class are crucial; without them the generated constructor would leave scalars indeterminate.

**Example 2 — Parameterized constructor**  
*Given:*  
```cpp
Point(int a, int b) : x(a), y(b) {}
Point q(5, -3);
```  
*Find:* values of `q`.  
- Overload resolution selects the two-parameter constructor.  
- Initializer list binds `x = 5`, `y = -3`.  
**Final answer**  
`q` holds (5, −3).  
*Reflection:* The initializer list guarantees that members are set before the constructor body executes.

**Example 3 — Copy constructor**  
*Given:*  
```cpp
Point r = q;          // or Point r(q);
```  
*Find:* relationship between `r` and `q`.  
- The initializer is a glvalue of type `Point`, so the copy constructor is chosen.  
- `r.x == q.x && r.y == q.y`.  
**Final answer**  
`r` is an independent duplicate.  
*Reflection:* Even though syntax resembles assignment, no assignment operator runs; construction is occurring.

**Example 4 — Delegating constructor**  
*Given:*  
```cpp
Point() : Point(0,0) {}
Point s;
```  
*Find:* state of `s`.  
- The default constructor delegates to the two-parameter constructor.  
- The delegated constructor initializes members to zero.  
**Final answer**  
`s` is again the origin, with no code duplication.  
*Reflection:* Delegation removes the temptation to copy initialization logic manually.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Missing user default constructor when other constructors exist | Compiler no longer synthesizes one                  | Explicitly declare `T() = default;`                  |
| Copy constructor receives `T` by value | Creates circular dependency on itself               | Always declare `T(T const&)`                         |
| Using assignment inside constructor body for reference members | Reference must be initialized, not assigned         | Use the initializer list exclusively                 |
| Forgetting `const` on copy-constructor parameter | Overload resolution fails to match temporaries      | Write `T(T const&)` by habit                         |
| Delegating constructor also lists other members | Language rule forbids mixing                        | Place only the delegation call in the initializer list |
| Defining two constructors with identical parameter lists | Overload ambiguity                                  | Ensure each constructor’s signature is unique        |
| Relying on generated copy constructor for classes owning raw pointers | Shallow copy of ownership semantics                 | Write a user-defined copy constructor or switch to smart pointers |

## 7. The textbook-precise statement
A constructor of class `T` is a member function whose name is `T` and that has no return type. If no user-declared constructor exists, a default constructor is implicitly declared. A copy constructor is a constructor whose first parameter is of type `T&`, `T const&`, `T volatile&`, or `T const volatile&` and whose other parameters, if any, have default arguments. A delegating constructor is a constructor whose sole mem-initializer is of the form `T(args)`. Overload resolution selects the constructor to be called for each object definition (Stroustrup, *The C++ Programming Language*, 4e, §17.4–17.6).

## 8. Visual — diagram or schematic
```text
Object Creation Flow
--------------------
declaration ──► overload resolution ──► chosen ctor
                │
                ├── no args          → default ctor
                ├── explicit values  → parameterized ctor
                ├── same-type glvalue→ copy ctor
                └── delegation syntax→ delegating ctor (then target)
```
Each arrow represents a compile-time decision; the chosen constructor’s initializer list then runs before its body.

## 9. The memory technique
1. **The hook** — Picture four doors labeled “Default”, “Params”, “Clone”, and “Delegate”; every object must walk through exactly one door at birth.  
2. **What to overlearn** — Signature forms: `T()`, `T(params)`, `T(T const&)`, `T() : T(args) {}`.  
3. **Spaced-repetition schedule** — Review signatures after 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive by asking: “How many arguments are visible at the declaration site?” and “Is the source object of identical type?”

## 10. What this unlocks
Mastery of these four constructor forms is the gateway to RAII, move semantics, and inheritance.  

- Resource-owning classes (std::vector, std::unique_ptr) rely on correct copy and move constructors.  
- Base-class initialization in derived-class constructors uses the same overload rules.  
- Rule of Five/Zero follows directly from the interaction of constructors with destructors and assignment operators.

## 11. Self-check — five questions, no answers
1. Write the shortest declaration that forces the compiler to generate a default constructor even though a parameterized constructor is also present.  
2. A class `Buffer` stores a raw pointer to a heap array. Show the copy constructor that performs a deep copy.  
3. Explain why `T(T)` is never a copy constructor.  
4. Demonstrate a delegating constructor that also initializes a `const` member; is it legal?  
5. Given three constructors `T()`, `T(int)`, `T(int,int=0)`, which is called by `T x = 5;` and why?