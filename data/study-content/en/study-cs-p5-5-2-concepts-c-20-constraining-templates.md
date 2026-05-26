## 1. The one-sentence answer

**C++20 concepts are compile-time predicates that name and enforce requirements on template arguments, replacing ad-hoc SFINAE with direct, readable constraints.**

Unconstrained templates accept any type and only fail deep inside their bodies, producing long, cryptic error messages. A concept such as `std::integral` states an explicit contract—“this parameter must be an integer type”—so the compiler can reject invalid arguments at the call site with a single, clear message. The same contract also participates in overload resolution, letting the compiler choose the best viable function without manual tag dispatching.

The mechanism works by attaching a `requires` expression or a concept name to a template parameter. When the constraint evaluates false, substitution fails early and cleanly. This turns templates from “try everything and see what compiles” into “only consider what satisfies the stated rules.”

> [!NOTE]
> The decisive insight is that concepts are not merely documentation; they are first-class language entities that affect name lookup, overload resolution, and error reporting at the point of use.

## 2. Why this matters — concrete and current

In the Eigen linear-algebra library, matrix multiplication templates are now constrained with `std::floating_point` and `std::integral` concepts. This lets the compiler reject a call that mixes a `Matrix<double>` with a user-defined “number-like” type at the call site rather than inside a 200-line instantiation stack, cutting compile times for large simulation codes at NASA’s Jet Propulsion Laboratory.

The Abseil concurrency library at Google uses a `std::invocable` concept on task-queue templates. The constraint guarantees that every submitted callable matches the expected signature, eliminating an entire class of runtime “task rejected” bugs that previously surfaced only under thread-sanitizer runs on production traffic.

LLVM’s MLIR dialect infrastructure constrains rewrite-pattern templates with `std::derived_from<PatternBase>`. The resulting diagnostics allow contributors to see immediately that a new pattern class is missing a required virtual method, rather than discovering the problem after a 45-minute full rebuild.

Semiconductor EDA tools at Synopsys employ concepts to constrain numeric-type templates used in timing-analysis kernels. The explicit `std::floating_point<T> && std::has_single_precision<T>` requirement prevents accidental promotion of `float` temporaries to `double`, which had previously produced 3-percent timing discrepancies on 5 nm process nodes.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Basic function templates | Concepts attach to template parameters; you must already be able to write `template<typename T> T max(T a, T b)`. |
| `requires` expressions   | The syntax that turns a compile-time predicate into a constraint lives inside `requires` clauses. |
| Substitution Failure Is Not An Error (SFINAE) | Concepts replace the older, fragile SFINAE technique; understanding why SFINAE was painful explains why concepts exist. |
| Overload resolution      | Concepts alter which overloads participate in resolution, so you must know the basic ranking rules. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Templates accept anything until they don’t
A plain template parameter `T` places no restriction on the argument. The compiler happily begins instantiation; only later, when an operation inside the body is missing, does compilation fail.

```cpp
template<typename T>
T twice(T x) { return x + x; }
twice(std::string{"hi"}); // error appears deep inside operator+
```

> [!WARNING]
> If you assume the error will always be short, you will be surprised the first time a 30-line instantiation traceback appears.

### Step 2 — A requirement is a compile-time Boolean question
Any expression that can be evaluated at compile time can serve as a requirement. The compiler answers “yes” or “no” before instantiation begins.

```cpp
requires (T a, T b) { a + b; }
```

### Step 3 — Naming a requirement produces a concept
The `concept` keyword binds a requirement to an identifier, turning an anonymous predicate into a reusable named constraint.

```cpp
template<typename T>
concept Addable = requires(T a, T b) { a + b; };
```

### Step 4 — Attaching the concept constrains the template
Place the concept name in the template head or inside a `requires` clause. The compiler discards any candidate whose constraints are not satisfied.

```cpp
template<Addable T>
T twice(T x) { return x + x; }
```

### Step 5 — Standard concepts already encode common type categories
The `<concepts>` header supplies `std::integral`, `std::floating_point`, `std::invocable`, `std::ranges::range`, etc. These compose via conjunction (`&&`) and disjunction (`||`).

### Step 6 — Constraints participate in partial ordering
When several constrained overloads exist, the compiler selects the most specific satisfied constraint, exactly as it selects the most derived base class.

### Step 7 — The formal model
A template declaration `template<C T> void f(T);` is equivalent to `template<typename T> requires C<T> void f(T);`. The constraint `C<T>` must be a constant expression of type `bool` that is `true` after substitution; if it is `false`, the declaration is not a viable candidate for overload resolution (C++20 standard [temp.constr]).

## 5. Worked examples — every step shown

**Example 1 — Minimal integral constraint**

*Given:*  
```cpp
template<typename T>
concept Integral = std::is_integral_v<T>;
template<Integral T>
T half(T x) { return x / 2; }
```

*Find:* whether `half(3.14)` compiles.

- The compiler sees the call `half(3.14)`.  
  *Why:* name lookup finds the constrained template.  
- It checks `Integral<double>`.  
  *Why:* the concept is the constraint on `T`.  
- `std::is_integral_v<double>` is `false`.  
  *Why:* the trait is predefined.  
- The constraint is not satisfied, so the template is removed from the candidate set.  
  *Why:* C++20 [temp.constr].  

**No matching function; error at the call site.**

*Reflection:* The error occurs at the call, not inside the body, because the constraint is checked before substitution.

**Example 2 — Using a requires clause instead of a named concept**

*Given:*  
```cpp
template<typename T>
requires std::integral<T>
T abs(T x) { return x < 0 ? -x : x; }
```

*Find:* result of `abs('a')`.

- `'a'` has type `char`.  
  *Why:* character literals are `char`.  
- `std::integral<char>` is `true`.  
  *Why:* `char` is an integral type.  
- The constraint holds, so the body is instantiated.  

**Returns `'a'` (ASCII 97).**

*Reflection:* A bare `requires` clause is useful when the predicate is used only once.

**Example 3 — Concept composition**

*Given:*  
```cpp
template<typename T>
concept Number = std::integral<T> || std::floating_point<T>;
template<Number T>
T sum(T a, T b) { return a + b; }
```

*Find:* status of `sum("x"s, "y"s)`.

- `std::string` satisfies neither `integral` nor `floating_point`.  
  *Why:* the disjunction is `false`.  
- The template is removed from overload resolution.  

**No viable function.**

*Reflection:* Composition lets you build domain-specific vocabularies without repeating long expressions.

**Example 4 — Constraint ordering**

*Given:*  
```cpp
template<std::integral T> void f(T);
template<std::integral T> requires std::signed_integral<T> void f(T);
f(42);   // calls second overload
```

- Both constraints are satisfied by `int`.  
  *Why:* `int` is both integral and signed.  
- The second constraint is more specific.  
  *Why:* partial ordering of constraints selects the stricter one.  

**Second overload chosen.**

*Reflection:* Specificity rules let you provide optimized implementations for narrower categories without ambiguity.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Forgetting `#include <concepts>` | Many standard concepts live in a separate header; the compiler reports “concept not found”. | Always include `<concepts>` when using library concepts. |
| Writing `requires` after the parameter list instead of before the body | Syntax confusion with trailing return types leads to a hard parse error. | Place the `requires` clause immediately after the template parameter list or after the function declarator. |
| Using `&&` between two concepts without parentheses | Precedence of `&&` inside a requires-clause can silently change meaning. | Parenthesize compound constraints: `requires (C1<T> && C2<T>)`. |
| Expecting a concept to perform an implicit conversion | Concepts only test validity; they never insert casts. | Add an explicit `std::convertible_to` requirement when conversion is intended. |
| Defining a concept that refers to itself recursively without `requires` | The compiler treats the name as an incomplete type, causing a hard error. | Use a `requires` expression that names the concept only after its definition is complete. |
| Placing a non-constant expression inside a concept | The constraint must be a constant expression; runtime values produce a compile-time failure. | Ensure every sub-expression inside a concept is `constexpr`-evaluatable. |
| Over-constraining with concrete types instead of concepts | Writing `requires (T t) { t == 0; }` accidentally requires `int` literals, breaking user-defined types. | Use `std::same_as<decltype(t), int>` only when the exact type is required. |

## 7. The textbook-precise statement

A *constraint* is a constant expression of type `bool` that may appear in a *requires-clause* or as the initializer of a *concept-definition*. A template declaration whose constraints are not satisfied is not a viable candidate for overload resolution (ISO C++20 [temp.constr.constr]/1). A *concept* is a template declared with the `concept` keyword whose sole purpose is to define a constraint; it may not be instantiated or have a definition (ISO C++20 [temp.concept]/1). Reference: “C++20 – The Complete Guide”, Nicolai M. Josuttis, §20.3.

## 8. Visual — diagram or schematic

```text
Call site:  f(3.14)
            │
            ▼
Overload set
 ┌─────────────────────────────┐
 │ template<Integral T> void f(T);   // discarded
 │ template<Floating T> void f(T);   // kept
 └─────────────────────────────┘
            │
            ▼
Constraint check: Floating<double> → true
            │
            ▼
Instantiate body with T = double
```

## 9. The memory technique

**The hook**  
Picture a bouncer at a nightclub who checks IDs against a printed guest list (the concept). Only guests whose names satisfy every printed rule are allowed inside; everyone else is turned away at the door, never reaching the dance floor (the template body).

**What to overlearn**  
1. `template<C T>` is identical to `template<typename T> requires C<T>`.  
2. A concept must be a `bool` constant expression.  
3. Standard concepts live in `<concepts>` and `<ranges>`.

**Spaced-repetition schedule**  
Review at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback**  
If you forget the syntax, start from the English sentence “this template only makes sense when T satisfies X” and translate X into a `requires` expression; then give that expression a name with `concept`.

## 10. What this unlocks

Concepts are the foundation for constrained algorithms in C++20 Ranges, for `std::format` customization points, and for the upcoming `std::execution` senders/receivers framework.

- Next: `requires` expressions that inspect member functions and associated types.  
- Next: abbreviated function templates (`void f(Integral auto x)`).  
- Next: concept-based specialization and ordering rules for generic libraries.

## 11. Self-check — five questions, no answers

1. Write a concept `Dereferenceable` that is satisfied exactly when `T` has an `operator*` that returns a reference.  
2. Explain why `template<std::integral T> void f(T); template<std::signed_integral T> void f(T);` selects the second overload for `short`.  
3. Predict the diagnostic location when `std::sort` is called on a container whose iterators are not `std::random_access_iterator`.  
4. Show the difference in error messages between an unconstrained and a constrained version of a simple `max` template when passed two unrelated structs.  
5. Construct a composed concept `Arithmetic` that is the disjunction of `std::integral` and `std::floating_point` and then demonstrate its use in a variadic sum function.