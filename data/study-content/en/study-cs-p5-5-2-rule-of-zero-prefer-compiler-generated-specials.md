## 1. The one-sentence answer
**The Rule of Zero declares that a well-designed C++ class defines none of the special member functions when its resource management can be expressed entirely through member objects that already obey the rule.**

A class that holds only primitives, standard-library types such as `std::string` or `std::vector`, or other user-defined types that themselves follow the Rule of Zero needs no user-written destructor, copy constructor, move constructor, copy-assignment operator, or move-assignment operator. The compiler supplies correct implementations that simply copy or move each member in turn. When every sub-object already knows how to manage its own resources, the enclosing class inherits that correctness without writing a single line of special-member code.

The intuition is therefore compositional: ownership and lifetime are delegated downward until they reach types whose authors have already solved the problem once. The result is shorter, clearer classes whose correctness argument is simply “each member is correct.”

> [!NOTE]
> The decisive insight is that the compiler’s generated special members are usually both faster and more maintainable than hand-written ones precisely because they are generated from the current member list; adding or removing a data member never requires touching the special functions.

## 2. Why this matters — concrete and current
Google’s Abseil library implements nearly every container and string type by composing standard-library or `absl::` primitives; none of these classes declare a user-provided destructor or copy operations, allowing the compiler to generate optimal move semantics automatically when the types are used inside performance-critical RPC paths.

In the LLVM code base, the `MachineInstr` and `Value` hierarchies store only `std::unique_ptr` and `SmallVector` members; the Rule of Zero guarantees that every new derived instruction receives correct move semantics without any author ever writing a special member, eliminating an entire class of lifetime bugs that plagued earlier hand-written versions.

Modern CUDA kernel-launch wrappers at NVIDIA encapsulate device memory inside `thrust::device_vector` or `std::vector` with a custom allocator; because these wrappers follow the Rule of Zero, they are trivially movable into asynchronous launch queues, enabling zero-copy hand-off between host and device scheduling layers.

The Eigen linear-algebra library’s `Matrix` and `Array` classes contain only plain-old-data buffers and integer dimensions; adherence to the Rule of Zero lets the compiler elide copies during expression-template evaluation, which is essential for the high-performance matrix multiplications used in TensorFlow’s CPU backend.

## 3. Mental prerequisites

| Concept                        | Why you need it here |
|--------------------------------|----------------------|
| Special member functions (default constructor, destructor, copy/move constructors, copy/move assignment) | They are exactly the five functions the Rule of Zero tells you not to write. |
| RAII and ownership semantics   | The rule works only when each member already encapsulates its own ownership. |
| Compiler-generated member rules (C++11 onward) | You must know when the compiler will and will not generate each function. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Identify the five special members
A class may define up to five special member functions that control object lifetime and copying.  
Example:  
```cpp
struct Widget {
    ~Widget();                    // destructor
    Widget(const Widget&);        // copy ctor
    Widget(Widget&&);             // move ctor
    Widget& operator=(const Widget&); // copy assign
    Widget& operator=(Widget&&);      // move assign
};
```
Formal statement: these five functions are the only ones the language will ever invoke implicitly for construction, destruction, or assignment.

> [!WARNING]
> Declaring any one of them suppresses certain compiler-generated defaults; forgetting which ones are suppressed is the most common source of subtle bugs.

### Step 2 — Compiler generation rules
If a special member is not user-declared, the compiler generates it when it is odr-used, provided every member and base has the corresponding operation.  
The generated destructor calls destructors of members in reverse declaration order; the generated copy constructor copies each sub-object with its copy constructor, and likewise for the remaining three operations.

### Step 3 — The Rule of Three (pre-C++11)
If a class defines any of destructor, copy constructor, or copy assignment, it almost certainly needs all three.  
This rule emerged because a user-written destructor that released a resource implied that the resource also required deep copies.

### Step 4 — Extension to the Rule of Five
C++11 added move operations. The same logic now applies to all five functions: defining any one usually requires careful thought about the other four.

### Step 5 — The Rule of Zero
When resource ownership is expressed solely through members that already manage their own resources, none of the five functions need be written at all.  
Formal claim: a class `C` satisfies the Rule of Zero when, for every special member `M`, either `C` does not declare `M` and the compiler-generated `M` is correct, or every member and base of `C` itself obeys the Rule of Zero.

### Step 6 — When the rule is deliberately broken
A class must depart from the Rule of Zero precisely when it directly manipulates a raw resource (owning raw pointer, raw file descriptor, raw mutex handle, etc.) that is not already encapsulated by a member object.

## 5. Worked examples — every step shown

**Example 1 — Trivial aggregate**  
*Given:*  
```cpp
struct Point { int x, y; };
```
*Find:* Does `Point` obey the Rule of Zero?  
All five special members are not declared.  
The compiler therefore generates them by copying the two `int` members.  
**Yes, `Point` obeys the Rule of Zero.**  
*Reflection:* The example is trivial yet illustrates that even built-in types satisfy the rule; nothing further is required.

**Example 2 — Standard-library composition**  
*Given:*  
```cpp
struct Document {
    std::string title;
    std::vector<std::string> paragraphs;
};
```
*Find:* Special members required?  
No user declarations appear.  
Each member’s move and copy operations are already correct.  
The compiler therefore generates all five members by delegating to `std::string` and `std::vector`.  
**Document obeys the Rule of Zero.**  
*Reflection:* Adding a new data member never forces the author to revisit any special function.

**Example 3 — Manual resource management (contrast)**  
*Given:*  
```cpp
class File {
    FILE* f;
public:
    explicit File(const char* name) : f(std::fopen(name, "r")) {}
    ~File() { if (f) std::fclose(f); }
};
```
*Find:* Does this obey the Rule of Zero?  
A user-written destructor exists, yet copy operations are not declared.  
The compiler therefore generates deleted copy operations, violating the Rule of Three/Five.  
**The class breaks the Rule of Zero and must be completed with the other four functions or rewritten with a resource-managing member.**  
*Reflection:* The presence of a raw owning pointer immediately signals that the Rule of Zero cannot apply.

**Example 4 — Refactored to obey the rule**  
*Given:* Replace the raw pointer with `std::unique_ptr<FILE, decltype(&std::fclose)>`.  
*Find:* Special members now required?  
No destructor or copy/move operations are declared.  
`std::unique_ptr` already implements correct move and deleted copy.  
The compiler generates a move-only `File` class automatically.  
**The refactored class obeys the Rule of Zero.**  
*Reflection:* Ownership policy is now expressed inside the member type; the enclosing class becomes a pure Rule-of-Zero type.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Declaring a destructor and expecting the compiler to generate copy operations | C++11 rule: user-declared destructor deletes copy operations | Never declare a destructor unless you also need custom copy behaviour; use a smart-pointer member instead |
| Writing a copy constructor but forgetting the move constructor | Move was added later; many programmers still think only in terms of the Rule of Three | After writing any custom copy, explicitly request the move operations with `= default` or delete them |
| Adding a raw owning pointer after the class already followed the Rule of Zero | New requirement appears without refactoring the ownership | Introduce a dedicated RAII member type first, then embed it |
| Assuming `= default` on the destructor still generates moves | `= default` counts as user-declared for the purpose of move generation | Prefer never to touch the destructor at all |
| Forgetting that `= delete` on copy also deletes move | The language rules treat deleted copy as “user-declared” | State intent explicitly: `= delete` both copy operations if a move-only type is desired |
| Relying on generated copies when a member has a deleted copy | The generated copy of the outer class is defined as deleted | Audit member types with `static_assert(std::is_copy_constructible_v<T>)` |
| Mixing Rule-of-Zero classes with inheritance hierarchies that declare virtual destructors | Virtual destructor is user-declared and therefore suppresses move generation in some ABIs | Keep polymorphic base classes minimal or use `final` on concrete types |

## 7. The textbook-precise statement
A class satisfies the Rule of Zero if and only if it declares none of the special member functions and every non-static data member and direct base class itself satisfies the Rule of Zero (C++ Core Guidelines, “C.20: If you can avoid defining default operations, do”, 2023 revision). Under these hypotheses the compiler-generated special member functions are defined and behave as member-wise copy, move, or destruction.

## 8. Visual — diagram or schematic
```text
Class Layout (Rule of Zero)
+---------------------------+
|  MyClass                  |
|  +-------------------+    |
|  | std::string title |    |  <-- already obeys Rule of Zero
|  +-------------------+    |
|  +-------------------+    |
|  | std::vector<int>  |    |  <-- already obeys Rule of Zero
|  +-------------------+    |
+---------------------------+
          |
          v   Compiler generates (no user code)
   ~MyClass, MyClass(const MyClass&), MyClass(MyClass&&),
   operator=, operator=(MyClass&&)
```
Each arrow represents delegation; no manual implementation crosses the boundary.

## 9. The memory technique
1. **The hook** — Picture a zero drawn on the blackboard; the class has literally zero handwritten special-member signatures inside it.  
2. **What to overlearn** — “If I never write a destructor, I never need to write anything else.”  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive by asking: “Does any member own a raw resource?” If the answer is no, the compiler can do the work.

## 10. What this unlocks
Mastery of the Rule of Zero lets you write classes that remain short and correct while automatically participating in move semantics, `noexcept` propagation, and empty-base optimisation. It is the foundation for the next concepts:

- Rule of Five when raw resources truly must be managed  
- `std::unique_ptr` and `std::shared_ptr` custom deleters  
- Value-semantic polymorphic wrappers (`std::function`, type-erasure idioms)  
- `noexcept` move guarantees required by standard containers  
- Automatic generation of `swap` and three-way comparison operators (C++20)

## 11. Self-check — five questions, no answers
1. A class contains a single `int` and a `std::string`; which of the five special members are user-declared?  
2. After adding a user-written destructor to a Rule-of-Zero class, which operations become deleted?  
3. Rewrite a class that stores a raw owning `FILE*` so that it again obeys the Rule of Zero.  
4. Why does declaring a virtual destructor in a base class sometimes prevent the compiler from generating move operations in a derived Rule-of-Zero class?  
5. Given two classes `A` (Rule of Zero) and `B` (user-defined destructor), construct a third class that embeds both and still obeys the Rule of Zero.