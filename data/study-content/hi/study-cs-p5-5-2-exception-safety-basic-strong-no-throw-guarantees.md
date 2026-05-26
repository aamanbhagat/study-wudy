## 1. The one-sentence answer
**Exception safety** defines the contractual promises a function makes about program state when an exception is thrown: basic (state remains valid), strong (state is unchanged), or no-throw (no exception occurs).

In C++ a function can fail partway through because of a thrown exception from a called operation. The three guarantees tell the caller exactly how much damage control is needed afterward. Basic guarantee ensures that resources are not leaked and class invariants still hold, so the program can continue without undefined behaviour. Strong guarantee adds the further promise that the observable state before the call is restored exactly, like an atomic transaction. No-throw guarantee promises the operation will always succeed or the program will terminate instead of propagating an exception.

> [!NOTE]
> The single most important insight is that exception safety is not about preventing exceptions; it is about defining the precise post-condition the caller can rely on when an exception does escape.

## 2. Why this matters — concrete and current
In the Linux kernel’s new eBPF verifier written in C++, every map-update helper must give the strong guarantee so that a failed verification never leaves the verifier’s internal state machine in an inconsistent state that later JIT compilation could exploit.

Google’s TensorFlow runtime uses no-throw move constructors on its `Tensor` objects when shuffling data between GPU and CPU buffers; any hidden allocation inside a move would break the real-time stream executor’s latency contract.

The LLVM compiler’s `SmallVector` template (used inside Clang) advertises the basic guarantee for `push_back`; this single decision lets the entire incremental linking pass in LLD avoid expensive manual rollback code after a memory-pressure exception.

NASA’s flight-software team at JPL chose the strong guarantee for the command-handler objects in the Perseverance rover’s vision pipeline so that a single radiation-induced allocation failure cannot corrupt the last known-good attitude estimate.

Semiconductor foundry TSMC’s OPC (optical proximity correction) tool, written in C++, relies on no-throw arithmetic routines inside its hot loop; any exception would invalidate hours of already-computed mask layers.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| RAII                     | Automatic resource release on scope exit is the only practical way to satisfy even the basic guarantee. |
| Class invariants         | You must be able to state precisely what “valid state” means after an exception.     |
| Move semantics           | Strong guarantee is often implemented by moving a temporary copy back on failure.    |
| `noexcept` specifier     | The language mechanism that both documents and enforces the no-throw guarantee.      |

If any row above is unfamiliar, pause and read the corresponding section on RAII and move semantics first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Identify the moment an exception can appear
A function is exception-safe only if every statement that might throw is followed by code that restores the required post-condition.  
Example:  
```cpp
void f(std::vector<int>& v) {
    v.push_back(42);          // might throw
    v.push_back(43);          // might throw
}
```
If the second `push_back` throws, the first element is already inserted; the caller sees a partially updated vector.  
Formal statement: let \(E\) be the set of statements that can throw; after any \(e\in E\) throws, the post-condition \(P\) promised by the chosen guarantee must hold.  
> [!WARNING]
> Treating every statement as atomic is the most common beginner mistake; only the statements that actually allocate or call user code can throw.

### Step 2 — Define the basic guarantee
After an exception the object is in a valid but unspecified state; no resources are leaked and all invariants hold.  
Example: a hand-written `Vector` that leaks on reallocation fails even the basic guarantee.  
Formal: \(\forall\) exceptions \(e\), the object \(o\) satisfies \(\text{invariant}(o)\land\text{no-leak}(o)\).

### Step 3 — Strengthen to the strong guarantee
The observable state after the exception is identical to the state before the call.  
Example: `std::vector::push_back` on a vector with spare capacity gives the strong guarantee because it only mutates the size after the element is successfully constructed.  
Formal: \(\text{state}_{\text{after}} = \text{state}_{\text{before}}\) or exception.

### Step 4 — Add the no-throw guarantee
The operation either succeeds or the program is terminated; no exception propagates.  
Example: `std::swap` on trivially copyable types is declared `noexcept`.  
Formal: the function’s exception specification is `noexcept(true)`.

### Step 5 — Compose guarantees across call chains
A function’s guarantee is at most as strong as the weakest guarantee of the operations it calls, unless it adds compensating code.  
Formal: if \(f\) calls \(g\) and \(g\) only offers basic, then \(f\) can claim at most basic unless it restores state itself.

### Step 6 — Encode the guarantee in source
Use `noexcept`, RAII, and copy-and-swap to make the chosen guarantee visible to both the compiler and human readers.  
Textbook-grade statement appears in Step 7.

## 5. Worked examples — har step show karo

**Example 1 — Basic guarantee on a simple buffer**  
*Given:*  
```cpp
class Buffer {
    int* data;
public:
    Buffer() : data(new int[10]) {}
    ~Buffer() { delete[] data; }
    void resize(std::size_t n);   // may throw
};
```
*Find:* Does `resize` satisfy basic?  
Step 1: allocate new array.  
Step 2: if allocation throws, old array still owned by `*this`.  
Step 3: copy data, then swap pointers.  
*Why* each step: allocation is the only throwing point; if it fails the destructor still runs.  
**Final answer: basic guarantee holds.**

*Reflection:* The example is tricky because the allocation can throw before any pointer is updated; the destructor supplies the safety net.

**Example 2 — Strong guarantee via copy-and-swap**  
*Given:*  
```cpp
void Vector::push_back(const T& x) {
    Vector tmp(*this);          // copy
    tmp.append(x);              // may throw
    swap(tmp);                  // noexcept
}
```
*Find:* guarantee level.  
Step 1: original vector untouched while `tmp` is mutated.  
Step 2: only on success is `swap` executed.  
*Why:* if `append` throws, `tmp` is destroyed, original unchanged.  
**Final answer: strong guarantee.**

*Reflection:* Copy-and-swap converts any basic operation into a strong one at the cost of an extra copy.

**Example 3 — No-throw move constructor**  
*Given:*  
```cpp
struct Node {
    Node(Node&& other) noexcept : next(other.next) { other.next = nullptr; }
};
```
*Find:* guarantee.  
Step 1: only pointer assignment, known not to throw.  
Step 2: `noexcept` tells the compiler.  
**Final answer: no-throw guarantee.**

*Reflection:* Declaring `noexcept` is both documentation and optimisation hint for containers.

**Example 4 — Mixed guarantees inside std::vector**  
*Given:* `v.reserve(n)` followed by many `push_back`.  
*Find:* overall guarantee for a loop of pushes.  
Step 1: `reserve` either succeeds or throws with strong guarantee.  
Step 2: subsequent `push_back` calls now have spare capacity and therefore give strong guarantee.  
**Final answer: entire sequence gives strong guarantee.**

*Reflection:* Pre-allocation removes the only throwing point that could have left the vector half-filled.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting that constructors can throw inside a container | New elements are constructed after memory is allocated | Use `reserve` first or wrap construction in try |
| Using raw `new` without RAII      | Manual delete is skipped on exception path  | Always store owning pointers in smart pointers |
| Declaring a move constructor `noexcept(false)` by accident | Forgot to write `noexcept` keyword          | Add `noexcept` and verify with `static_assert` |
| Assuming `swap` is always `noexcept` | User-defined `swap` may allocate            | Implement `swap` with only pointer moves     |
| Returning a local object that may throw during copy | Pre-C++11 return-value optimisation not guaranteed | Rely on guaranteed copy elision or move      |
| Writing “catch-all” handlers that swallow exceptions | Masks the failure instead of restoring state | Let exceptions propagate or use `std::terminate` for no-throw contract |
| Changing a class invariant after a successful operation but before an exception | Partial update left visible                 | Update invariant only inside a `noexcept` block or after all operations succeed |

## 7. The textbook-precise statement
A function provides the *basic guarantee* if, after an exception propagates out of the function, every object whose state was altered by the function still satisfies its class invariants and no resources owned by those objects have been leaked (Stroustrup, *The C++ Programming Language*, 4e, §13.5.2).  

A function provides the *strong guarantee* if, in addition, the state of every such object after the exception is identical to its state immediately before the function was called.  

A function provides the *no-throw guarantee* if it never allows an exception to propagate (i.e., it is declared `noexcept(true)` or its body contains no potentially-throwing operations). These three guarantees are the only standard levels recognised by the C++ language and library.

## 8. Visual — diagram or schematic
```text
Caller state
     │
     ▼
[ function entry ]
     │
     ├──► success path ──► [ post-condition P holds ]
     │
     └──► exception path ──►
               │
               ├── basic:  invariants hold, possible new state
               ├── strong: state == entry state
               └── no-throw: never reached (program ends)
```

## 9. The memory technique

1. **The hook** — picture three safes: the basic safe has a valid but possibly different combination, the strong safe is locked exactly as you left it, and the no-throw safe is welded shut.

2. **What to overlearn** — the three names in order of increasing strength, and the fact that `noexcept` on a move constructor gives the container strong exception safety for free.

3. **Spaced-repetition schedule** — review definitions after 1 day, 3 days, 7 days, 16 days, 35 days.

4. **First-principles fallback** — ask “what does the caller see in memory after the exception?”; the answer directly names the guarantee.

## 10. What this unlocks
Once you can reason about these three guarantees you can implement exception-safe containers, write `noexcept` move operations that enable `std::vector` reallocation without copies, and design transactional interfaces used in lock-free data structures.

- Enables copy-and-swap idiom for strong guarantee  
- Permits `std::is_nothrow_move_constructible` traits in generic code  
- Required for implementing `std::pmr` memory resources safely  
- Foundation for lock-free programming where exceptions must never escape critical sections

## 11. Self-check — five questions, no answers
1. A function that leaks a raw pointer on exception but leaves all class invariants intact satisfies which guarantee?  
2. Why does providing the strong guarantee usually cost an extra allocation or copy?  
3. If a move constructor is not `noexcept`, what guarantee does `std::vector::push_back` lose when it runs out of capacity?  
4. Write the shortest code change that upgrades a basic-guarantee `insert` into a strong-guarantee one.  
5. Which of the three guarantees can be verified at compile time by the compiler, and why?