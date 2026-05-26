## 1. The one-sentence answer

**A lambda capture list decides exactly which variables from the surrounding scope are brought into the lambda and whether each one is copied (by value) or aliased (by reference).**

When you write a lambda such as `[x, &y](int z){ return x + y + z; }`, the compiler must know the lifetime and mutability rules for `x` and `y`. Capture by value creates an independent copy that lives as long as the lambda object itself; capture by reference creates an alias that is valid only while the original variable remains alive. The distinction matters because a lambda can outlive the scope in which it was created, turning a reference capture into a dangling reference.

The same lambda can mix both styles, and the default capture specifiers `=` and `&` provide shorthand for “copy everything” or “reference everything.” Understanding the capture list therefore removes the most common source of lifetime bugs when lambdas are stored, passed to algorithms, or executed on other threads.

> [!NOTE]
> The single most important insight is that the capture list is not about the lambda’s parameters; it is about the *environment* the lambda closes over. Parameters are fresh each call; captured variables are fixed at the moment the lambda object is created.

## 2. Why this matters — concrete and current

In the Clang static analyser used inside Xcode, lambdas that capture `this` by reference are flagged when the lambda may be stored beyond the lifetime of the originating object; the analyser relies on precise modelling of `[this]` versus `[=]` to avoid false positives on modern Objective-C++ interop code.

Inside the CUDA runtime that ships with NVIDIA’s HPC SDK, device lambdas passed to `thrust::transform` must capture by value because the data is copied to GPU memory; any reference capture would point into host memory that the device cannot access, producing a segmentation fault at kernel launch.

The Chromium compositor uses `[=]` capture when building `base::OnceCallback` objects that are posted across threads; the team deliberately switched from implicit reference capture after a 2019 race condition in the viz process was traced to a lambda that outlived a `scoped_refptr`.

LLVM’s new pass manager stores lambdas inside `std::function` objects that survive multiple optimisation stages; the pass authors therefore require explicit `[&ctx]` or `[ctx = std::move(ctx)]` so that move-only context objects are handled without unnecessary copies.

Finally, the control software on the Mars 2020 Perseverance rover uses C++14 lambdas inside its flight software; capture-by-value rules were enforced by the MISRA C++ checker to guarantee that no lambda could accidentally reference a stack frame that had already been popped when the command queue executed the closure hours later.

## 3. Mental prerequisites

| Concept                    | Why you need it here                                                                 |
|----------------------------|---------------------------------------------------------------------------------------|
| C++ function objects       | A lambda is syntactic sugar for an anonymous class with `operator()`; capture list becomes data members of that class. |
| Scope and lifetime         | Reference captures create aliases whose validity depends on the original variable’s storage duration. |
| `const` correctness        | By-value captures are `const` by default; the `mutable` keyword is required to modify them. |
| Move semantics (optional)  | Modern lambdas often move objects into the closure; `[x = std::move(y)]` is a common pattern. |

If any row above is unfamiliar, pause and review that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Lambda as a miniature class
A lambda expression is compiled into an unnamed class whose `operator()` contains the body you wrote. The capture list becomes the member variables of that class.

Example: `[x](int y){ return x + y; }` produces a class that looks roughly like `struct __lambda { int x; auto operator()(int y) const { return x + y; } };`.

Formally, the closure type is a unique, unnamed, non-union class type.

> [!WARNING]
> If you treat the lambda as “just a function pointer,” you will miss that each capture adds state; two lambdas with identical bodies but different captures have different types and cannot be assigned to each other.

### Step 2 — Capture by value syntax and semantics
Write the variable name inside the brackets: `[x]`. The compiler copies `x` into a data member of the closure at the point the lambda is evaluated.

The captured member has the same cv-qualification as the original variable unless `mutable` is used.

### Step 3 — Capture by reference syntax and semantics
Prefix the name with `&`: `[&x]`. The compiler stores a reference (or pointer) to the original object; no copy occurs.

The reference remains valid only while the original object’s storage duration has not ended.

### Step 4 — Default capture modes
`[=]` means “capture every odr-used local variable by value.” `[&]` means “capture every odr-used local variable by reference.” You may still list individual variables to override the default.

### Step 5 — Mixing captures and the mutable keyword
You can write `[x, &y, z = std::move(w)]`. Each entry is independent. Adding `mutable` after the parameter list removes `const` from `operator()`, allowing modification of value-captured members.

### Step 6 — Lifetime and dangling-reference rule
A reference capture is valid only while the referenced object lives. A value capture lives exactly as long as the lambda object. This is the root cause of the majority of lambda-related bugs.

### Step 7 — Formal capture clause grammar (C++14)
The grammar is `[` *capture-list* `]`, where each element is either *identifier*, `&` *identifier*, `this`, `*this`, or an *init-capture* of the form *identifier* `=` *initializer*. The resulting closure stores each captured entity according to the rules above.

## 5. Worked examples — har step show karo

**Example 1 — Simple value capture**
- *Given:* `int a = 5; auto f = [a](int b){ return a + b; };`
- *Find:* value of `f(3)` and whether `a` can be changed through `f`.
- Step 1: `a` is copied into the closure at lambda creation.  
  *Why:* the capture list `[a]` triggers copy-initialisation of the closure’s data member.
- Step 2: `f(3)` evaluates to `5 + 3`.  
  *Why:* the body uses the captured copy.
- Final answer: **8**; `a` cannot be changed through `f` because the captured member is `const`.

*Reflection:* the example shows that value capture isolates the lambda from later changes to the original variable.

**Example 2 — Reference capture and mutation**
- *Given:* `int a = 5; auto f = [&a](int b){ a += b; return a; };`
- *Find:* value of `f(3)` and the state of `a` afterwards.
- Step 1: `&a` stores a reference inside the closure.  
  *Why:* the `&` token selects reference capture.
- Step 2: `a += 3` modifies the original `a`.  
  *Why:* the reference aliases the same object.
- Final answer: **8** and `a == 8` after the call.

*Reflection:* reference capture gives the lambda write access but ties its correctness to the original variable’s lifetime.

**Example 3 — Default capture with selective override**
- *Given:* `int x = 1, y = 2; auto f = [=, &y]{ return x + y; };`
- *Find:* captured entities and their modes.
- Step 1: `=` captures `x` by value.  
  *Why:* default is value.
- Step 2: `&y` overrides the default for `y`.  
  *Why:* explicit listing takes precedence.
- Final answer: closure contains a copy of `x` and a reference to `y`.

*Reflection:* mixing prevents accidental reference captures while still allowing necessary mutation.

**Example 4 — Dangling reference after scope exit**
- *Given:* `auto make_lambda() { int local = 42; return [&local]{ return local; }; }`
- *Find:* behaviour of the returned lambda.
- Step 1: `[&local]` captures a reference to `local`.  
  *Why:* the `&` forces reference capture.
- Step 2: `local` is destroyed when `make_lambda` returns.  
  *Why:* automatic storage duration ends at scope exit.
- Final answer: **undefined behaviour** on any subsequent call.

*Reflection:* the example demonstrates why reference captures must be audited whenever a lambda may escape its creation scope.

## 6. Common traps and how to avoid them

| Trap                                | Why it happens                                      | How to avoid it                                      |
|-------------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Capturing `this` by reference then storing the lambda | Implicit `[&]` or `[this]` is easy to write         | Prefer `[=, *this]` or `std::enable_shared_from_this` |
| Using `[&]` inside a loop that posts work to a thread pool | All iterations alias the same loop variable         | Capture the loop variable by value or use `std::ref` carefully |
| Forgetting `mutable` when modifying a value capture | `operator()` is `const` by default                  | Add `mutable` after the parameter list               |
| Capturing a large object by value unintentionally | `[=]` silently copies everything                    | List only needed variables or use init-capture moves |
| Returning a lambda that references a parameter       | Parameter dies at function return                   | Capture by value or move the object into the lambda  |
| Mixing `[=]` and `[&]` without explicit listing      | Default rules become hard to track                  | Always write the first capture explicitly            |
| Using a moved-from variable after init-capture       | `[x = std::move(y)]` leaves `y` in a valid but empty state | Document or assert post-move state                   |

## 7. The textbook-precise statement

From Stroustrup, *The C++ Programming Language*, 4th edition, §11.4.3:

“A *lambda-expression* is a *closure-expression* that evaluates to a *closure object*. The *lambda-capture* introduces *captured entities* into the closure. An *identifier* in the capture list without a leading `&` is captured by copy; a leading `&` causes capture by reference. If the capture list begins with `=` or `&`, the default capture mode applies to every odr-used automatic variable not explicitly mentioned. The type of the closure is a unique class type with a public inline function call operator whose cv-qualification is `const` unless the lambda is declared `mutable`.”

All hypotheses ( odr-use, automatic storage duration, copy-initialisation of captures) are required for the statement to hold.

## 8. Visual — diagram or schematic

```
Scope
┌──────────────────────────────┐
│ int a = 10;                  │
│ int b = 20;                  │
│                              │
│ auto lam = [a, &b](int c) {  │
│     return a + b + c;        │   ┌─────────────────────┐
│ };                           │──▶│ closure object      │
│                              │   │  a_copy : int  (10) │
│ // later                     │   │  b_ref  : int& (→b)│
│ lam(5);                      │   └─────────────────────┘
└──────────────────────────────┘
```
`a_copy` lives with the lambda; `b_ref` is valid only while `b` exists.

## 9. The memory technique

1. **The hook**  
   Picture a photocopy machine for value capture and a rubber band for reference capture. The photocopy stays in the lambda’s folder forever; the rubber band snaps if the original paper is removed.

2. **What to overlearn**  
   - `[x]` → copy, independent lifetime  
   - `[&x]` → alias, same lifetime as `x`  
   - `mutable` removes `const` from value captures

3. **Spaced-repetition schedule**  
   Review the three bullets above after 1 day, 3 days, 7 days, 16 days, and 35 days.

4. **First-principles fallback**  
   If you forget the syntax, ask: “Does the lambda need its own copy or must it see the latest value?” The answer directly selects `[]` versus `[&]`.

## 10. What this unlocks

Mastery of capture lists lets you safely store, move, and compose lambdas in higher-order functions, asynchronous frameworks, and generic algorithms.

- `std::for_each`, `std::transform`, and range adaptors become natural.
- `std::function` and `std::move_only_function` can hold stateful closures without lifetime surprises.
- Thread-pool task submission, continuation passing, and coroutine lambdas become reliable.
- Custom smart-pointer deleters and factory functions that return polymorphic callables become straightforward.

## 11. Self-check — five questions, no answers

1. Write a lambda that captures `x` by value and `y` by reference, then increments both inside the body. Which one actually changes the original variable?

2. A lambda `[=] { return ++counter; }` is stored in a `std::vector` and invoked after the surrounding function returns. Is the behaviour defined?

3. Convert the capture `[x, &y, z = std::move(w)]` into the equivalent hand-written closure class. List every data member and its cv-qualification.

4. Identify the dangling-reference bug in `auto f = [&](int i){ return data[i]; };` when `f` is returned from the function that declared `data`.

5. Explain why `[this]` and `[*this]` produce different results when the lambda outlives the original object, and which one is safer when the lambda is stored inside a member function.