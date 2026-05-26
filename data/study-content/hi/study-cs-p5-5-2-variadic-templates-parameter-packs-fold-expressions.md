## 1. The one-sentence answer
**Variadic templates let you write a single function or class template that accepts any number of arguments by capturing them inside a parameter pack that you can later expand or fold.**

A parameter pack is declared with an ellipsis after the type or name, for example `typename... Ts`. The compiler records every argument you pass and treats the pack as a compile-time list. You expand the pack by placing the ellipsis in the right context, such as `func(args...)`, which substitutes each stored argument in turn. Fold expressions, introduced in C++17, give you a concise syntax to apply a binary operator across the entire pack without writing an explicit recursive helper.

The key mental shift is that everything happens at compile time; the generated code is ordinary, non-variadic C++ that the compiler can optimise exactly as it would for hand-written overloads.

> [!NOTE]
> The single most important realisation is that a parameter pack is not a runtime container; it is a compile-time sequence that disappears after template instantiation, leaving only the concrete calls you intended.

## 2. Why this matters — concrete and current
Google’s Abseil logging library uses variadic templates to implement `LOG(INFO) << "value =" << x << y` without forcing the user to write a format string; the pack captures every streamed argument and forwards it to a type-erased sink.

LLVM’s TableGen backend and Clang’s attribute parser both rely on parameter packs to accept an arbitrary list of type traits or diagnostic arguments; the same template definition therefore works for 1 or 20 arguments without code duplication.

The C++ standard library’s `std::apply` and `std::make_from_tuple` (C++17) are implemented with fold expressions over an index pack, allowing any tuple to be turned into a function call at zero runtime cost.

Modern game engines such as Unreal Engine 5 expose variadic reflection macros that let developers register an arbitrary number of member variables for serialisation; the generated code is produced by expanding a single pack-based template.

Microsoft’s DirectX Shader Compiler uses fold expressions to validate and combine an arbitrary number of shader stage flags in a single `constexpr` expression, eliminating a long chain of `if constexpr` branches.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Ordinary function templates and class templates | Variadic templates are simply templates whose parameter list ends with an ellipsis. |
| Perfect forwarding (`std::forward`, `T&&`) | Almost every variadic function must forward its arguments without copying.          |
| `sizeof...` operator     | The only built-in operator that yields the length of a parameter pack at compile time. |
| `constexpr` and `if constexpr` | Modern variadic code uses compile-time branching instead of recursion for termination. |

If any of these four items are shaky, pause and review them first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Declaring a parameter pack
A template parameter list may end with `typename... Ts` or `auto... Vs`. The compiler treats everything after the ellipsis as a single entity that stands for zero or more concrete arguments.

```cpp
template<typename... Ts>
void printAll(Ts... args);
```
The declaration above says “accept any number of arguments of any types and name that sequence `args`.”

> [!WARNING]
> Writing `Ts args...` instead of `Ts... args` is a common syntax error; the ellipsis belongs to the type, not the variable.

### Step 2 — Expanding a parameter pack
You expand a pack by writing the pack name followed by an ellipsis in a context that expects a comma-separated list. Expansion is purely textual substitution performed by the compiler.

```cpp
template<typename... Ts>
void printAll(Ts... args) {
    (std::cout << ... << args);   // fold expression (C++17)
}
```
The line above expands to `std::cout << arg0 << arg1 << …` for whatever arguments were supplied.

### Step 3 — Unary vs binary fold expressions
A unary fold has only one pack and an operator on one side:
```cpp
(args + ... )          // left fold
(... + args)           // right fold
```
A binary fold adds an initial value on the opposite side of the operator:
```cpp
(0 + ... + args)
```
The compiler inserts the operator between every pair of expanded elements.

### Step 4 — Termination without recursion (C++17 style)
Before fold expressions you wrote an explicit base-case overload that accepted zero arguments. With folds the base value itself acts as the terminator, so a single definition suffices.

### Step 5 — Index sequences for heterogeneous access
When you need both the value and its position, combine a parameter pack with `std::index_sequence`:
```cpp
template<std::size_t... Is, typename Tuple>
auto select(Tuple&& t, std::index_sequence<Is...>) {
    return std::make_tuple(std::get<Is>(t)...);
}
```
This pattern appears in almost every advanced tuple utility.

### Step 6 — Formal statement
A variadic template is a template whose template-parameter-list contains a parameter-pack. After substitution, the pack is expanded into a comma-separated list of the supplied template-arguments or function-arguments, and any surrounding expression is replicated for each element.

## 5. Worked examples — har step show karo

**Example 1 — Sum of an arbitrary number of integers**
*Given:* a call `sum(1, 2, 3, 4)`
*Find:* the compile-time expansion that produces the result 10.

```cpp
template<typename... Ts>
constexpr auto sum(Ts... args) {
    return (args + ... + 0);
}
```
- The binary fold `(args + ... + 0)` is chosen so the empty case yields 0.  
- Expansion becomes `(((1 + 2) + 3) + 4) + 0`.  
- Result is evaluated at compile time because everything is `constexpr`.

**Final answer**  
**10**

*Reflection:* The initial value 0 guarantees a well-formed expression even when the pack is empty; this pattern generalises to any associative operation.

**Example 2 — Print with spaces, C++17 fold**
*Given:* `print("hi", 42, true)`
*Find:* the single-statement body that produces `hi 42 1 `.

```cpp
template<typename... Ts>
void print(Ts... args) {
    ((std::cout << args << ' '), ...);
}
```
- The comma operator evaluates each sub-expression in order.  
- Expansion yields `((std::cout << "hi" << ' '), (std::cout << 42 << ' '), (std::cout << true << ' '))`.

**Final answer**  
**hi 42 1**

*Reflection:* Using the comma operator inside a unary left fold is the idiomatic way to perform side-effect-only expansions.

**Example 3 — Perfect-forwarding variadic constructor**
*Given:* a class that stores an arbitrary number of members.

```cpp
template<typename... Ts>
struct Store {
    std::tuple<Ts...> data;
    Store(Ts&&... ts) : data(std::forward<Ts>(ts)...) {}
};
```
- `Ts&&...` declares a pack of forwarding references.  
- `std::forward<Ts>(ts)...` expands to one `std::forward` call per argument.

**Final answer**  
The tuple stores exactly the original value categories of the arguments.

*Reflection:* Forgetting `std::forward` is the most frequent source of unnecessary copies in variadic code.

**Example 4 — all_true with short-circuit via fold**
*Given:* `all_true(true, false, true)`
*Find:* a fold expression returning `false`.

```cpp
template<typename... Ts>
constexpr bool all_true(Ts... args) {
    return (args && ...);
}
```
- Right fold is used; evaluation order follows the language rules for `&&`.  
- The expression short-circuits at runtime exactly as a normal `&&` chain would.

**Final answer**  
**false**

*Reflection:* Fold expressions respect the built-in short-circuit semantics of `&&` and `||`; no extra metaprogramming is required.

## 6. Common traps and how to avoid them

| Trap                                | Why it happens                                              | How to avoid it                                      |
|-------------------------------------|-------------------------------------------------------------|------------------------------------------------------|
| Writing `Ts args...` instead of `Ts... args` | Confusing the pack declaration syntax                       | Always place the ellipsis immediately after the type or `auto` |
| Empty-pack compilation failure      | Binary fold without an initial value has no operator        | Supply a neutral element: `(0 + ... + args)`         |
| Forgetting `std::forward`           | Pack expansion copies by default                            | Write `std::forward<Ts>(args)...` in every forwarding context |
| Using runtime loops over a pack     | Believing a pack is a container                             | Remember packs exist only at compile time; expand or use `std::apply` |
| Mixing pack and non-pack parameters after the ellipsis | C++ syntax forbids parameters after a pack                  | Place ordinary parameters before the variadic pack   |
| Assuming left-to-right evaluation order in every fold | Language only guarantees left-to-right for certain operators | Consult [expr.prim.fold] when order matters          |
| Forgetting `sizeof...` needs parentheses | `sizeof...Ts` is ill-formed                                 | Always write `sizeof...(Ts)`                         |

## 7. The textbook-precise statement
A variadic template is a template whose template-parameter-list contains a parameter-pack (`…`). After substitution of template-arguments for the template-parameters, any pack-expansion that names the parameter-pack is replaced by a comma-separated list of the substituted arguments (C++ Standard, [temp.variadic]/4). A fold-expression of the form `( cast-expression fold-operator … )` or `( … fold-operator cast-expression )` applies the operator between every pair of expanded elements; when an initial value is supplied the form becomes a binary fold ([expr.prim.fold]). The only operator that directly interrogates a parameter-pack is `sizeof…`, which yields the number of elements in the pack after expansion ([expr.prim.fold]/3). These rules appear in ISO/IEC 14882:2020 §13.7.4 and §7.6.1.7.

## 8. Visual — diagram or schematic
```text
Template parameter list
          │
          ▼
template <typename... Ts>          // Ts is a parameter pack
void f(Ts... args) {               // args is a function parameter pack
    (args + ... + 0);              // fold expression expands to
                                   // (((arg0 + arg1) + arg2) + …) + 0
}
          │
          ▼
Expansion (compile time)
arg0, arg1, arg2, …               // concrete comma-separated list
```

## 9. The memory technique

**The hook**  
Picture a telescope that can be extended with any number of segments; each segment is an argument you slide into the pack. When you look through the fully extended telescope you see the folded result.

**What to overlearn**  
- Declaration: `typename... Ts`  
- Expansion: `expr...`  
- Fold with neutral: `(init + ... + pack)`  
- Length: `sizeof...(Ts)`

**Spaced-repetition schedule**  
Review the four bullet points above after 1 day, 3 days, 7 days, 16 days and 35 days.

**First-principles fallback**  
If you forget the syntax, start from an ordinary two-argument template, duplicate the body for three arguments, then replace the repeated pattern with an ellipsis; the compiler will accept the compacted form.

## 10. What this unlocks
Once you master parameter packs you can implement type-safe heterogeneous containers, custom tuple utilities, and zero-overhead logging façades. The next natural steps are:

- Index sequences and `std::integer_sequence`
- `std::apply`, `std::visit`, and `std::make_from_tuple`
- Recursive template metaprogramming patterns that are later replaced by folds
- C++20 concepts constraining parameter packs (`template<typename... Ts> requires (std::is_integral_v<Ts> && ...)`)
- Reflection proposals that treat member lists as packs

## 11. Self-check — five questions, no answers
1. Write a variadic `constexpr` function that returns the product of all arguments; handle the empty case correctly.
2. Explain why `void g(auto... xs, int y);` is ill-formed while `void g(int y, auto... xs);` is valid.
3. Convert the classic recursive `print` function that uses `if constexpr` into a single-statement fold expression.
4. Demonstrate a fold expression that concatenates `std::string_view` objects with a separator, again handling the empty pack.
5. Identify the expansion of `(std::cout << ... << args)` when `args` contains three elements and state whether the order of `<<` operations is guaranteed.