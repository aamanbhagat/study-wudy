## 1. The one-sentence answer
**The `noexcept` specifier tells the compiler that a function promises never to throw an exception.**

Iska matlab yeh hai ki jab aap kisi function ke signature mein `noexcept` likhte ho, to compiler ko pata chal jaata hai ki us function ke andar koi bhi exception nahi throw hoga. Is promise ki wajah se compiler aggressive optimizations kar sakta hai, jaise move operations ko safely use karna ya exception-handling tables ko hata dena. Agar function phir bhi exception throw kar de, to program turant `std::terminate` call karta hai bina unwind kiye.

Aap ise ek contract ki tarah soch sakte ho: function likhne wala keh raha hai “main exception nahi phenkunga”. Yeh contract sirf documentation nahi hai; yeh runtime behaviour aur code generation dono ko affect karta hai.

> [!NOTE]
> Sabse badi “aha” yeh hai ki `noexcept` sirf ek hint nahi, balki ek hard guarantee hai jo language rules enforce karti hai — isliye iska galat istemal program ko crash kar sakta hai.

## 2. Why this matters — concrete and current
In high-performance vector containers inside LLVM’s libc++, `noexcept` move constructors allow `std::vector` reallocation to use move instead of copy, cutting latency by 30-40 % on large object moves.

Google’s TensorFlow uses `noexcept` on its custom allocator functions so that the hot path of tensor allocation never incurs exception-table lookup overhead on ARM64 servers.

In NASA’s cFS (Core Flight System) flight software rewritten in C++17, every device-driver method is marked `noexcept` to guarantee that a single exception cannot bring down the entire spacecraft task.

Semiconductor EDA tools at Synopsys mark their core simulation kernels `noexcept` so that the JIT compiler can safely inline them without generating landing pads, improving simulation throughput on billion-gate designs.

The move constructor of `std::unique_ptr` is declared `noexcept`; this single annotation lets every standard container treat `unique_ptr` as a cheap movable type during sorting and resizing.

## 3. Mental prerequisites

| Concept                    | Why you need it here                                      |
|----------------------------|-----------------------------------------------------------|
| Function declaration syntax | `noexcept` appears in the same position as `const` or `override` |
| Exception handling model   | You must know what happens when an exception escapes a `noexcept` function |
| Move semantics             | `noexcept` enables strong exception guarantee for moves   |
| `std::terminate`           | The consequence of violating the `noexcept` contract      |

## 4. Building the idea — from intuition to formalism

### Step 1 — A function that promises silence
Aap ek normal function likhte ho jo kabhi exception nahi phenkega.  
Example: `int compute(int x) { return x*x; }`  
Formal statement:  
$$f : \text{function} \to \text{noexcept}(true)$$  
> [!WARNING] Agar aap galti se exception throw kar dete ho, to program instantly terminate ho jaayega bina stack unwind ke.

### Step 2 — Two syntactic forms
`noexcept` aur `noexcept(true)` dono ek hi baat kehte hain; `noexcept(false)` matlab “exception throw kar sakta hai”.  
Example: `void risky() noexcept(false);`  
Formal:  
$$\text{noexcept-specifier} ::= \texttt{noexcept} \mid \texttt{noexcept}(constant-expression)$$

### Step 3 — Implicit noexcept on destructors
Since C++11, every destructor is implicitly `noexcept(true)` unless a member destructor is `noexcept(false)`.  
Example: class with a throwing destructor member loses the implicit guarantee.  
> [!WARNING] Agar koi base class destructor `noexcept(false)` ho, to derived class destructor bhi automatically `noexcept(false)` ban jaata hai.

### Step 4 — Conditional noexcept
Aap expressions ke basis par `noexcept` decide kar sakte ho.  
Example: `T(T&& other) noexcept(std::is_nothrow_move_constructible_v<T>);`  
Formal:  
$$\texttt{noexcept}(e) \equiv \text{value of } e \text{ after conversion to } bool$$

### Step 5 — Interaction with the type system
`noexcept` function pointer aur normal function pointer alag types hain.  
Example: `void (*p)() noexcept = f;` is valid only if `f` is also `noexcept`.  
> [!WARNING] Assignment of a non-noexcept function to a noexcept pointer is a compile-time error.

### Step 6 — The strong exception guarantee
Containers rely on `noexcept` move operations to provide the strong guarantee during reallocation.  
Formal textbook statement appears in section 7.

## 5. Worked examples — har step show karo

**Example 1 — Trivial noexcept function**  
*Given:* `int square(int x) noexcept { return x*x; }`  
*Find:* Does the compiler treat it as non-throwing?  
Step 1: Signature contains `noexcept` → true.  
Step 2: Body cannot throw → contract satisfied.  
*Why:* Literal multiplication never throws.  
**Final answer:** `square` is `noexcept(true)`.

*Reflection:* Simple case shows that `noexcept` is both declaration and enforceable promise.

**Example 2 — Violating the contract**  
*Given:* `void boom() noexcept { throw 42; }`  
*Find:* What happens at runtime?  
Step 1: `throw` executes inside `noexcept` function.  
Step 2: Language rule calls `std::terminate()`.  
*Why:* No stack unwinding is performed.  
**Final answer:** Program terminates immediately.

*Reflection:* Shows that `noexcept(false)` behaviour is not optional at runtime.

**Example 3 — Conditional move constructor**  
*Given:*  
```cpp
template<typename T>
struct Vec {
    Vec(Vec&& other) noexcept(std::is_nothrow_move_constructible_v<T>);
};
```  
*Find:* Is the constructor `noexcept` when `T=int`?  
Step 1: `std::is_nothrow_move_constructible_v<int>` evaluates to `true`.  
Step 2: `noexcept(true)` is therefore attached.  
*Why:* `int` move is always non-throwing.  
**Final answer:** Constructor is `noexcept(true)` for `T=int`.

*Reflection:* Conditional form lets library writers propagate noexcept-ness automatically.

**Example 4 — Function pointer assignment**  
*Given:*  
```cpp
void f() noexcept;
void g();
void (*p)() noexcept = f;   // OK
void (*q)() noexcept = g;   // ?
```  
*Find:* Does the second line compile?  
Step 1: `g` is implicitly `noexcept(false)`.  
Step 2: Type mismatch with `noexcept` pointer.  
*Why:* `noexcept` is part of the function type.  
**Final answer:** Compilation error on the second line.

*Reflection:* Demonstrates that `noexcept` affects overload resolution and type compatibility.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                | How to avoid it                              |
|-----------------------------------|-----------------------------------------------|----------------------------------------------|
| Marking every function `noexcept` | Desire for speed without understanding cost   | Only mark when you can prove no exception    |
| Forgetting `noexcept` on move ctor| Default move is `noexcept` only for simple types | Explicitly write `noexcept` move operations  |
| Using `noexcept` on a function that calls throwing code | Hidden calls inside third-party libraries     | Audit call graph or use `noexcept(false)`    |
| Confusing `noexcept` with `throw()` | Old C++98 syntax still compiles in legacy mode | Always use `noexcept`; never `throw()`       |
| Returning a throwing lambda from `noexcept` function | Lambda’s exception specification is separate  | Mark the lambda `noexcept` as well           |
| Assuming `noexcept` on virtual functions is inherited | Overrider may drop the specifier              | Re-declare `noexcept` in every override      |
| Checking `noexcept` at runtime only | `noexcept` operator exists but is compile-time | Use `noexcept(expr)` operator in `static_assert` |

## 7. The textbook-precise statement
From ISO/IEC 14882:2020 (C++20 standard), §14.5:  
A function with a *noexcept-specifier* that evaluates to `true` is a non-throwing function. If a non-throwing function attempts to throw an exception, `std::terminate` is invoked. The *noexcept-specifier* forms part of the function type; two function types are different if their *noexcept-specifiers* differ.

## 8. Visual — diagram or schematic
```
Caller
  |
  v
+------------------+      exception?      +-----------------+
| noexcept(true)   |  ------------------> | std::terminate  |
| function         |                      +-----------------+
+------------------+
       |
       | no exception
       v
   normal return
```

## 9. The memory technique
1. **The hook** — Picture a vault labelled “NO EXCEPTIONS” that instantly locks and self-destructs if anything tries to escape.  
2. **What to overlearn** — `noexcept` on move constructors, the fact that `noexcept` is part of the type, and that violation calls `std::terminate`.  
3. **Spaced-repetition schedule** — Review after 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Ask “Can any statement inside this function possibly throw?” If the answer is yes, do not write `noexcept`.

## 10. What this unlocks
Once you master `noexcept`, you can write containers, allocators, and low-level primitives that satisfy the strong exception guarantee and enable move-only optimizations used throughout the STL.

- Writing custom `std::vector`-like classes  
- Implementing `noexcept` allocators for embedded systems  
- Understanding `std::is_nothrow_move_constructible` traits  
- Safe use of `std::move_if_noexcept`

## 11. Self-check — five questions, no answers
1. What is the type difference between `void(*)()` and `void(*)() noexcept`?  
2. Does marking a destructor `noexcept(false)` affect derived classes?  
3. Write the declaration of a move constructor that is `noexcept` only when the member type’s move is non-throwing.  
4. What happens at runtime if a `noexcept(true)` function throws?  
5. Why does the standard library require `noexcept` on `std::unique_ptr`’s move constructor?