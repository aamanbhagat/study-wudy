## 1. The one-sentence answer
**A lambda capture list declares exactly which enclosing-scope variables become usable inside the lambda and whether each is copied by value or bound by reference.**

A lambda without a capture list can only see its own parameters and global names. Adding a capture list opens a controlled window into the surrounding function’s local variables. The compiler turns the chosen variables into data members of the hidden closure object that implements the lambda.

Capture by value copies the variable’s current value at the moment the lambda is created; later changes to the original have no effect inside the lambda. Capture by reference stores a reference, so the lambda always sees the live value and can modify it when the reference is non-const.

> [!NOTE]
> The single most important insight is that the capture list is not syntax sugar for parameter passing; it defines the *state* of the closure object itself.

## 2. Why this matters — concrete and current
In the LLVM/Clang codebase, lambdas with mixed value and reference captures are used inside the new pass manager to hold both immutable analysis results (by value) and mutable transformation state (by reference) while iterating over the IR.

Modern game engines such as Unreal Engine 5 employ reference-capturing lambdas in their parallel task graph to update shared transform buffers without copying large component arrays on every worker thread dispatch.

Google’s TensorFlow C++ frontend uses value-capturing lambdas when constructing per-device computation kernels so that shape metadata captured at graph-construction time remains constant even if later graph mutations occur.

NASA’s flight software for the Perseverance rover’s vision pipeline captures sensor-calibration constants by value inside real-time image-processing lambdas to guarantee that a late telemetry update cannot corrupt an in-flight frame.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Function scope & lifetime| Captured references must outlive the lambda’s execution   |
| `const` correctness      | Value captures are `const` by default; `mutable` overrides it |
| Copy vs move semantics   | Expensive objects captured by value trigger copies unless moved |

## 4. Building the idea — from intuition to formalism

### Step 1 — A lambda with no captures
A lambda that mentions only its parameters needs nothing from the caller’s stack frame.  
```cpp
auto f = [](int x){ return x * 2; };
```
The formal syntax begins with an empty capture list:
\[
[\,]\;(\textit{params})\;\rightarrow\;\textit{ret}\;\{\textit{body}\}
\]

> [!WARNING]
> Adding an identifier without a capture list produces a compile-time error; the compiler does not search enclosing scopes by default.

### Step 2 — The need to reach outward
When the body refers to a local variable, the compiler must be told how to transport that variable into the closure object.

### Step 3 — Capture by value
Writing `[x]` creates a non-static data member inside the closure that holds a copy of `x`.  
The closure’s call operator receives
\[
\texttt{auto operator()}(\textit{params})\;\texttt{const}
\]
so the copy cannot be modified unless `mutable` is added.

### Step 4 — Capture by reference
Writing `[&x]` stores a reference (or pointer) to the original object. The generated call operator is non-const and modifications are visible to the caller.

### Step 5 — Mixed capture lists
A list may contain both forms:
\[
[x,\ \&y,\ z]
\]
Order is insignificant; each entry is independent.

### Step 6 — Default capture modes
`[=]` captures every odr-used local by value; `[&]` captures every odr-used local by reference. Explicit entries can override the default:
\[
[\&,\ x]\quad\text{captures everything by reference except }x\text{ by value.}
\]

### Step 7 — Formal grammar (C++14 onward)
The capture list is defined by the grammar production
\[
\textit{capture-list} ::= \textit{capture}\;(\texttt{,}\;\textit{capture})^{*}
\]
where each *capture* is one of `&` *identifier*, *identifier*, `this`, `*this`, or a simple *initializer-capture*.

## 5. Worked examples — every step shown

**Example 1 — Trivial value capture**  
*Given:*  
```cpp
int a = 5;
auto lam = [a]() { return a + 1; };
```
*Find:* value of `lam()`.  
- The identifier `a` appears in the capture list → a copy is stored.  
- Body evaluates the copy → `5 + 1`.  
**5**  

*Reflection:* The original `a` may change later; the lambda remains unaffected.

**Example 2 — Reference capture mutation**  
*Given:*  
```cpp
int b = 10;
auto lam = [&b]() { b += 3; };
lam();
```
*Find:* value of `b` after the call.  
- `[&b]` stores a reference.  
- `b += 3` writes through that reference.  
**13**  

*Reflection:* Lifetime of `b` must exceed any invocation of `lam`.

**Example 3 — Mixed default and explicit**  
*Given:*  
```cpp
int x = 1, y = 2;
auto lam = [=, &y]() mutable { x = 9; y = 8; return x + y; };
```
*Find:* return value and final states of `x`, `y`.  
- Default `=` copies `x`; explicit `&y` binds reference.  
- `mutable` permits assignment to the copy of `x`.  
- Result: `9 + 8 = 17`; `x` unchanged, `y` becomes 8.  
**17** (with `x==1`, `y==8`)  

*Reflection:* Default and explicit entries combine without conflict.

**Example 4 — Capturing `this`**  
*Given:*  
```cpp
struct S {
  int v = 42;
  auto get() { return [this]() { return v; }; }
};
S s; auto f = s.get();
```
*Find:* `f()`.  
- `[this]` captures the pointer to the object.  
- `v` is looked up via that pointer.  
**42**  

*Reflection:* The object must outlive the lambda.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Dangling reference capture        | Local variable destroyed before lambda runs | Capture by value or extend lifetime          |
| Forgetting `mutable`              | Value captures are `const` by default       | Add `mutable` when assignment is required    |
| Expensive copies with `[=]`       | Large objects copied into closure           | Capture by reference or move large objects   |
| Capturing loop variables by reference | All iterations see the final value       | Capture by value or use `std::ref` carefully |
| `this` captured implicitly with `[=]` | Surprising pointer copy semantics        | Prefer `[=, *this]` or `[self=*this]` in C++17+ |
| Order of evaluation of captures   | Unsequenced modifications possible          | Keep captures side-effect free               |
| Using `std::function` with reference captures | Lifetime surprises at call sites       | Prefer templates or `std::move` closures     |

## 7. The textbook-precise statement
ISO/IEC 14882:2020 §7.5.5.2 states that the *lambda-capture* introduces *captured entities* into the *closure type*. Each entity is either *copied* (by-value capture) or *bound by reference* (by-reference capture). The type of the closure is an unnamed class containing the corresponding non-static data members; the *operator()* is `const`-qualified unless the lambda is declared `mutable`. Reference: Stroustrup, *The C++ Programming Language*, 4e, §11.4.3.

## 8. Visual — diagram or schematic
```text
Caller stack frame
+-------------------+
| int a = 5;        |  <-- value captured  [a]  (copy stored in closure)
| int &r = b;       |  <-- reference       [&r] (alias stored)
+-------------------+
        | capture list
        v
Closure object
+-------------------+
| int  a_copy = 5;  |   // by value
| int& r_alias;     |   // by reference
+-------------------+
        |
   operator()()
```

## 9. The memory technique
1. **The hook** — Picture the capture list as a small backpack the lambda carries; each variable is either photocopied (value) or given a live phone line (reference).  
2. **What to overlearn** — `[x]` = copy, `[&x]` = live link; default `[=]` versus `[&]`; `mutable` removes const on copies.  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive by asking “Does the lambda need a copy or the live object?” and write the corresponding token.

## 10. What this unlocks
Mastery of capture lists lets you write efficient, thread-safe closures that appear throughout STL algorithms, asynchronous task systems, and modern ranges libraries.  

- Next: generic lambdas and `auto` parameters  
- `std::function` vs. template deduction of closure types  
- Move-only captures with `[x = std::move(y)]`  
- Recursive lambdas via `std::function` or Y-combinator patterns

## 11. Self-check — five questions, no answers
1. Write a lambda that captures two integers by value and returns their sum; then change one original integer and show the lambda still returns the old sum.  
2. Demonstrate a dangling-reference bug and the single-line fix that makes the program well-defined.  
3. Given a loop variable `i`, produce two lambdas—one capturing by value, one by reference—and explain why they behave differently when stored in a vector and invoked later.  
4. Convert the capture `[=, &x, y]` into an equivalent explicit list without a default.  
5. In a member function, decide whether `[this]`, `[*this]`, or `[self=*this]` is required to safely return a lambda that outlives the call.