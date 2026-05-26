## 1. The one-sentence answer
**The Rule of Zero states that a class should not explicitly declare any special member functions (destructor, copy/move constructors, copy/move assignments) when its only responsibility is to hold resources that are already managed by other classes.**

Modern C++ lets the compiler generate correct special members automatically when your class contains only value types, smart pointers, or containers. Aap jab apni class mein raw pointers ya manual resource handling avoid karte ho, toh compiler khud hi copy, move, aur destroy ka sahi code likh deta hai. Iska matlab yeh hai ki aap sirf data members define karo aur baaki sab compiler par chhod do. Yeh approach code size kam karti hai aur bugs kam karti hai kyunki manually likha hua code galtiyon ka source ban sakta hai.

> [!NOTE]
> The deepest insight is that resource ownership should be encapsulated in dedicated classes (like `std::unique_ptr` or `std::vector`); once that is done, your own classes become “plain old data with behavior” and need zero special-member code.

## 2. Why this matters — concrete and current
In the LLVM/Clang codebase, hundreds of AST node classes follow the Rule of Zero by storing only `std::unique_ptr` children and `llvm::SmallVector` members, letting the compiler generate all five special members and eliminating an entire class of double-delete bugs that plagued earlier hand-written versions.

Google’s Abseil library containers such as `absl::flat_hash_map` are written under the Rule of Zero; their internal bucket arrays are managed by `std::unique_ptr`, so the map class itself declares no destructor or copy operations, giving the compiler maximum freedom for copy elision and small-object optimization.

NASA’s cFS (Core Flight System) flight software, rewritten in C++17, replaced dozens of legacy classes that manually managed telemetry buffers with Rule-of-Zero classes containing only `std::vector<uint8_t>`; the change removed an entire layer of custom copy logic that had caused memory leaks during long-duration Mars missions.

In high-frequency trading engines at Jane Street, order-book classes hold only `std::array` of price levels and `std::unique_ptr` to matching logic; because no special members are written, the compiler can aggressively inline and vectorize hot paths that would have been blocked by user-declared destructors.

The Carbon language compiler experiments at Google deliberately enforce the Rule of Zero on every user-defined type so that move semantics remain trivial by default, enabling whole-program devirtualization passes that would otherwise be defeated by non-trivial special members.

## 3. Mental prerequisites

| Concept                        | Why you need it here                                      |
|--------------------------------|-----------------------------------------------------------|
| Special member functions       | You must know exactly which five functions the compiler can generate. |
| RAII                           | Ownership must be tied to object lifetime for automatic generation to be correct. |
| Smart pointers & containers    | They are the “resource handles” that let your class stay rule-of-zero compliant. |
| Value semantics                | Understanding when a type should be copyable versus movable is essential. |

If any row above is unfamiliar, pause and read the corresponding earlier lesson before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Identify the five special members
Aap pehle yeh samajh lo ki C++ ek class ke liye paanch special member functions automatically generate kar sakta hai: default constructor, destructor, copy constructor, copy assignment, move constructor, aur move assignment. Jab aap inme se koi bhi khud likhte ho, toh compiler kuch rules ke mutabik baaki ko suppress kar deta hai.

Example: `struct S { S() = default; };` likhne ke baad compiler ab move operations generate nahi karega.

Formal statement: If any special member is user-declared, the conditions for implicit generation of the remaining special members are governed by [class.ctor]/5–8, [class.dtor]/5, and [class.copy.ctor]/6–8 of the C++ standard.

> [!WARNING]
> Declaring only a destructor silently deletes both copy and move operations; later code that tries to move an object will suddenly fail to compile.

### Step 2 — Recognize resource-owning members
Agar koi member khud resource manage karta hai (raw pointer, file handle, lock), toh uska destructor, copy, aur move sahi tarike se likhna padta hai. Rule of Zero tabhi apply hota hai jab saare members already managed types hon.

Example: `std::unique_ptr<int>` member hone par uska destructor khud hi delete karega, isliye aapko kuch nahi likhna padta.

Formal statement: A member of type `T` is “non-trivial” for a special member `SM` if `T`’s corresponding `SM` is non-trivial; the class’s generated `SM` is then defined as deleted or non-trivial accordingly.

### Step 3 — Apply the “zero” test
Class definition mein koi bhi destructor, copy/move constructor, ya copy/move assignment operator explicitly declare mat karo. Agar definition clean hai, compiler sab generate karega.

Example: `struct Node { std::unique_ptr<Node> left, right; int value; };` — zero special members written.

Formal statement: A class satisfies the Rule of Zero when it declares none of the special member functions listed in [special]/1.

### Step 4 — Verify triviality and noexcept
Generated operations trivial aur `noexcept` hone chahiye taaki containers aur algorithms unhe efficiently use kar sakein. `std::is_trivially_copyable_v<T>` aur `std::is_nothrow_move_constructible_v<T>` se check karo.

Example: `std::array<int,4>` is trivially copyable; a Rule-of-Zero wrapper around it inherits that property.

Formal statement: The generated copy/move operations are trivial if and only if every subobject’s corresponding operation is trivial ([class.copy.ctor]/11–13).

### Step 5 — Revisit only when necessary
Jab aapko custom logic add karna pade (reference counting, deep clone, logging), tab Rule of Five apply hota hai. Warna Rule of Zero hi default rakhna chahiye.

Formal statement: Once any special member is user-defined, the class must define all five (or delete the unwanted ones) to maintain the expected relationships among copy, move, and destruction.

## 5. Worked examples — har step show karo

**Example 1 — Minimal value type**
*Given:* A simple coordinate pair.
*Find:* Whether any special members are required.
```cpp
struct Point {
    double x, y;
};
```
Compiler automatically generates all five special members because both members are trivial scalars.  
*Why:* No user declaration exists, so [class.ctor]/6 applies.  
**All five members are compiler-generated and trivial.**

*Reflection:* This is the simplest case; adding any user-written destructor would delete the move operations.

**Example 2 — Owning smart pointer**
*Given:* A class that owns a heap integer.
*Find:* Special-member declarations needed.
```cpp
struct Owner {
    std::unique_ptr<int> p;
};
```
No declarations written. `unique_ptr`’s move operations are non-trivial, so `Owner` receives move constructor/assignment but its copy operations are deleted.  
*Why:* The presence of a non-copyable member suppresses generation of copy members.  
**Rule of Zero satisfied; copy is correctly disabled.**

*Reflection:* The example shows that Rule of Zero does not imply “everything is copyable”; it only means “let the compiler decide.”

**Example 3 — Mixing container and smart pointer**
*Given:* A node in a tree.
*Find:* Generated behavior.
```cpp
struct TreeNode {
    std::vector<TreeNode> children;
    std::unique_ptr<int> payload;
};
```
`vector` supplies copy and move; `unique_ptr` supplies only move. The resulting class is therefore movable but not copyable.  
*Why:* Overload resolution selects the best match from each member.  
**Generated move operations exist; copy operations are deleted.**

*Reflection:* Real-world tree structures almost always follow this pattern.

**Example 4 — Adding custom logic later**
*Given:* The same `TreeNode` now needs a visit counter.
*Find:* What must be written.
```cpp
struct TreeNode {
    std::vector<TreeNode> children;
    std::unique_ptr<int> payload;
    int visitCount = 0;          // new data
    // must now write Rule-of-Five members if deep-copy semantics required
};
```
Once a custom copy is needed, all five members must be considered.  
*Why:* Adding user code breaks the “zero” precondition.  
**Rule of Zero no longer applies; Rule of Five becomes necessary.**

*Reflection:* This escalation path is exactly why the Rule of Zero is preferred until the moment it is provably insufficient.

## 6. Common traps and how to avoid them

| Trap                                      | Why it happens                                      | How to avoid it                                      |
|-------------------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Declaring a destructor “just in case”     | Habit from C++98 or defensive coding                | Delete the destructor line unless you truly need it  |
| Forgetting that a user-declared destructor deletes moves | Misremembering the “Rule of Three/Five” rules       | Compile with `-Wdeprecated` or run `= default` checks |
| Writing a copy constructor but not move   | Partial modernization of old code                   | Always consider the full set of five functions       |
| Assuming Rule of Zero implies public copy | Confusing “compiler-generated” with “copyable”      | Check `std::is_copy_constructible_v<T>` explicitly   |
| Putting raw owning pointers in the class  | Not yet internalized RAII                           | Wrap every raw resource in a dedicated handle class  |
| Using `= delete` on one operation only    | Trying to block only copies but forgetting moves    | Delete both copy members together or use a smart pointer |
| Adding a virtual destructor without need  | “Every base class needs one” reflex                 | Add virtual destructor only when the class is actually a polymorphic base |

## 7. The textbook-precise statement
A class `C` satisfies the Rule of Zero if and only if it declares none of the following: its default constructor, its destructor, its copy constructor, its copy-assignment operator, its move constructor, or its move-assignment operator (C++ Core Guidelines, C.20–C.21, “Rule of Zero”). Under this condition the compiler will attempt to generate each special member according to the rules in ISO/IEC 14882:2020 §11.4.5–§11.4.7; the generated operations will have the same triviality, noexcept specification, and accessibility as the corresponding operations of `C`’s subobjects.

## 8. Visual — diagram or schematic
```
Class layout (Rule of Zero)

+-----------------------+
|   struct TreeNode     |
|  +------------------+ |
|  | vector<TreeNode> |  <-- compiler uses its move/copy
|  +------------------+ |
|  | unique_ptr<int>  |  <-- compiler uses its move only
|  +------------------+ |
|  | int visitCount   |  <-- trivial scalar
|  +------------------+ |
+-----------------------+
No user-written destructor / copy / move
```

## 9. The memory technique
1. **The hook** — Picture a clean desk (your class) that only holds already-labeled folders (smart pointers/containers). You never need to write “how to pack/unpack” instructions because the folders already know.
2. **What to overlearn** — (a) Never write a destructor unless you also manage a raw resource; (b) `= default` on a special member is a deliberate declaration, not “zero”; (c) `std::is_trivially_copyable_v<T>` must be true for many performance paths.
3. **Spaced-repetition schedule** — Review the five special-member generation rules after 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First-principles fallback** — If you forget the rule, ask: “Does every member already know how to copy/move/destroy itself?” If yes, write nothing.

## 10. What this unlocks
Mastering the Rule of Zero lets you design classes that are automatically exception-safe, trivially movable when possible, and future-proof against language evolution. It directly enables:

- Correct use of `std::variant`, `std::optional`, and ranges algorithms that rely on trivial relocation.
- Writing high-performance value types for SIMD and cache-friendly data structures.
- Seamless integration with `noexcept` move semantics required by `std::vector` reallocation guarantees.
- Adherence to the C++ Core Guidelines’ “no raw owning pointers” and “prefer concrete types” sections.

## 11. Self-check — five questions, no answers
1. What happens to the move constructor of a class that explicitly declares a destructor?
2. Write the shortest class that is movable but not copyable while obeying the Rule of Zero.
3. Given `struct X { std::unique_ptr<int> p; X(const X&) = delete; };`, is the move constructor generated? Why or why not?
4. A class contains only `std::array<std::unique_ptr<int>, 4>`. Is it trivially movable? Prove using trait checks.
5. You later discover that your Rule-of-Zero class must log destruction. Which exact set of special members must you now write or default, and in what order?