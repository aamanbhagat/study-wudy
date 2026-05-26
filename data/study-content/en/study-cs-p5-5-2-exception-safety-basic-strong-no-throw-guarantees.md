## 1. The one-sentence answer
**Exception safety classifies operations by the guarantees they provide when an exception occurs: the basic guarantee leaves the program in a valid state, the strong guarantee restores the prior state exactly, and the no-throw guarantee ensures no exception is ever emitted.**

These three levels form a hierarchy that lets callers reason about failure without inspecting every line of implementation. The basic guarantee prevents leaks and broken invariants but permits partial side effects; the strong guarantee adds transactional semantics so that success and failure are the only observable outcomes; the no-throw guarantee removes the possibility of failure from the caller’s perspective entirely. In practice a single function may offer different guarantees for different failure modes, yet the strongest applicable guarantee is the one documented and tested.

> [!NOTE]
> The strongest guarantee that can be offered cheaply usually wins; attempting the strong guarantee on every operation inflates both code size and runtime cost, while offering only the basic guarantee forces every caller to implement its own rollback logic.

## 2. Why this matters — concrete and current
NASA’s flight software for the Perseverance rover uses a mixture of strong and no-throw operations in its real-time control loops; a single unhandled exception path would trigger the spacecraft’s safe-mode transition, aborting the entire surface mission for hours.

Google’s TensorFlow runtime isolates GPU kernel launches behind no-throw boundaries so that an out-of-memory event in one training step cannot corrupt the session state of concurrent experiments running on the same host.

Modern semiconductor place-and-route tools at TSMC maintain strong exception guarantees around incremental database updates; an exception during timing-driven legalization must leave the netlist exactly as it was before the pass so that the tool can retry with different parameters without restarting the entire multi-hour job.

The C++ standard library containers in LLVM’s libc++ are implemented to the strong guarantee for single-element insertions; this property lets the Clang static analyzer assume that a thrown comparison operator leaves the container observationally identical to its pre-call state, enabling precise path-sensitive bug reports.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|---------------------------------------------------------------------------------------|
| C++ class invariants     | Every guarantee is stated relative to the invariants that must hold after an exception |
| RAII and destructors     | Automatic cleanup is the only reliable way to satisfy the basic guarantee             |
| Move semantics           | Cheap rollback often relies on non-throwing moves                                       |
| `noexcept` specifier     | The language mechanism that both documents and enforces the no-throw guarantee        |

## 4. Building the idea — from intuition to formalism

### Step 1 — A valid state is not necessarily the original state
A program is in a valid state when all its objects satisfy their documented invariants and no resources have been leaked.  
Consider a vector that doubles its capacity: if allocation fails after the new buffer exists but before elements are copied, the vector must still be usable even though its contents differ from the pre-call state.  
Formally, after any operation that exits via exception, every live object `o` satisfies `I(o)` where `I` is the invariant predicate.  
> [!WARNING]  
> Treating “valid” as synonymous with “unchanged” leads to unnecessary copying and hides the fact that the basic guarantee already permits observable mutation.

### Step 2 — Rollback restores the exact pre-call state
Strong safety adds the requirement that an exceptional exit leaves every object bitwise or at least observationally identical to its state before the operation began.  
A transactional insert into a map that copies both key and value before any mutation can discard the copies on failure, restoring the map exactly.  
Let `S₀` be the state before the call and `Sₑ` the state after an exception; strong safety demands `Sₑ ≡ S₀`.  
> [!WARNING]  
> Copying after mutation has begun usually violates the strong guarantee because the copy may itself throw.

### Step 3 — No-throw removes the exception path from the type system
A no-throw operation is statically declared with `noexcept`; the compiler is allowed to assume that control never leaves via exception.  
`std::swap` on trivially copyable types is `noexcept`; therefore any container using it for internal reorganization can offer the strong guarantee without try blocks.  
Formally, `f() noexcept` asserts that the post-condition is reached on every control-flow path.  
> [!WARNING]  
> Declaring a function `noexcept` when it can still throw calls `std::terminate`; the guarantee is therefore both a promise and a constraint.

### Step 4 — Hierarchy of guarantees
If an operation meets the strong guarantee it automatically meets the basic guarantee; if it meets the no-throw guarantee it meets both stronger claims.  
The hierarchy is therefore  
basic ⊑ strong ⊑ no-throw.  
> [!WARNING]  
> Offering a weaker guarantee than necessary forces every caller to implement defensive copying, multiplying code and defect surface.

### Step 5 — The formal statement
An operation `f` on an object of type `T` provides  
- the **basic guarantee** when every exceptional exit preserves `I(T)` and releases all resources acquired by `f`;  
- the **strong guarantee** when every exceptional exit yields a state indistinguishable from the pre-call state;  
- the **no-throw guarantee** when `f` is declared `noexcept` and therefore never propagates an exception.  
These definitions appear in standard library documentation and are the criteria used by the C++ Core Guidelines.

## 5. Worked examples — every step shown

**Example 1 — Basic guarantee on vector resize**  
*Given:* `std::vector<int> v{1,2,3};` followed by `v.push_back(4)` that triggers reallocation and then throws inside a copy constructor.  
*Find:* State of `v` after the exception.  
Allocate new buffer (succeeds).  
*Why:* Allocation is the first step that can throw.  
Attempt to copy elements into new buffer; the copy constructor of the fourth element throws.  
*Why:* The strong guarantee would require the old buffer to remain untouched, but the basic guarantee only requires validity.  
Destroy the partially constructed new buffer and deallocate it.  
*Why:* RAII ensures the new storage is released.  
`v` still points to the original buffer containing `{1,2,3}` and satisfies its invariants.  
**Final answer: vector remains valid and unchanged.**  
*Reflection:* The example shows that basic safety permits the implementation to attempt optimization (larger capacity) yet still recover without leaks.

**Example 2 — Strong guarantee via copy-and-swap**  
*Given:* A class `Widget` holding a `std::unique_ptr<Impl>`; its assignment operator written as `Widget& operator=(Widget tmp) noexcept { swap(*this, tmp); return *this; }`.  
*Find:* State after a throwing move into `tmp`.  
Parameter `tmp` is initialized by move or copy; if that initialization throws, the original object is untouched.  
*Why:* The strong guarantee is obtained because no member of `*this` has been modified.  
`swap` is `noexcept`, therefore the only possible exception occurs before any change.  
**Final answer: strong guarantee holds.**  
*Reflection:* The pattern demonstrates how an inexpensive `noexcept` primitive (swap) upgrades a potentially throwing operation to strong safety.

**Example 3 — No-throw guarantee on a primitive swap**  
*Given:* Two `int` variables.  
*Find:* Exception behavior of `std::swap(a,b)`.  
The exchange is performed with three moves, each of which is known not to throw for `int`.  
*Why:* Trivially copyable scalar types have non-throwing moves by definition.  
The function is therefore marked `noexcept`.  
**Final answer: no-throw guarantee.**  
*Reflection:* The case is trivial yet foundational; every container relies on it to implement stronger guarantees elsewhere.

**Example 4 — Mixed guarantees inside one method**  
*Given:* A `push_back` that first reserves capacity (strong) then constructs the element in place.  
*Find:* Guarantee offered by the whole operation.  
Capacity reservation offers the strong guarantee.  
*Why:* It either succeeds or leaves the container unchanged.  
Element construction occurs only after reservation; if it throws, the extra capacity may remain but the logical size is unchanged, satisfying only the basic guarantee.  
**Final answer: overall guarantee is basic.**  
*Reflection:* The strongest local guarantee does not automatically propagate when later steps can fail.

## 6. Common traps and how to avoid them

| Trap                                      | Why it happens                                      | How to avoid it                                      |
|-------------------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Declaring a destructor `noexcept(false)`  | Fear of hidden throws inside member destructors     | Make every destructor `noexcept` by default          |
| Checking `noexcept` only on the happy path  | Overlooking that allocation or callbacks may throw  | Audit every called function for its documented guarantee |
| Using raw pointers for ownership          | Manual `delete` appears after a throwing call       | Replace with `unique_ptr` or `make_unique`           |
| Assuming strong guarantee from copy-and-swap when the copy itself throws after partial mutation | Copy constructor mutates external state             | Copy into a temporary that cannot affect `*this`     |
| Marking a move constructor `noexcept` without verifying members | Move of a member may allocate                       | `= default` on a type with only non-throwing members |
| Returning a strong-guarantee container by value without `noexcept` move | Move may throw, weakening the caller’s guarantee    | Ensure the container’s move is `noexcept`            |
| Ignoring exception safety of third-party callbacks | Callback contract is weaker than assumed            | Document and enforce the required guarantee at the call site |

## 7. The textbook-precise statement
An operation provides the basic guarantee if, on exit via exception, every object whose lifetime has begun satisfies its invariants and every resource acquired by the operation has been released. It provides the strong guarantee if, in addition, the observable state after the exception is identical to the state immediately prior to the call. It provides the no-throw guarantee if it is declared `noexcept` (or `throw()` in pre-C++11 code) and therefore cannot exit via exception. These definitions are taken from ISO/IEC 14882:2020 §15.4 and are elaborated in Josuttis, *The C++ Standard Library*, 2e, §4.5.

## 8. Visual — diagram or schematic
```text
State diagram for a single operation
          ┌──────────────┐
          │   Pre-state  │
          └──────┬───────┘
                 │ call
          ┌──────▼───────┐
          │  In progress │
          └───┬──────┬───┘
              │      │
         success   exception
              │      │
    ┌─────────▼──┐ ┌─▼────────────┐
    │ Post-state │ │ Basic: valid │
    │  (new)     │ │ Strong: same │
    └────────────┘ │ No-throw: impossible
                   └──────────────┘
```
Horizontal arrows represent control flow; vertical placement shows that only the no-throw path has a single exit.

## 9. The memory technique
1. **The hook** — Picture a bank transaction: basic safety is “the bank still exists,” strong safety is “your balance is unchanged,” no-throw is “the ATM never jams.”
2. **What to overlearn** — The three labels and their total order; the fact that `noexcept` is the only way to obtain the no-throw guarantee.
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive from the definitions of invariant, resource acquisition, and the `noexcept` specifier; ask “what must be true after an exception?”

## 10. What this unlocks
Mastery of exception-safety guarantees lets you write containers, allocators, and lock-free data structures whose failure modes are predictable. It directly enables the next topics of allocator-aware containers, `noexcept` propagation rules, and transactional memory proposals.

- Strong exception safety in `std::vector::insert`
- `noexcept` move constructors and the rules of `swap`
- Lock-free programming patterns that rely on the absence of exceptions
- Custom allocators that must satisfy the basic guarantee

## 11. Self-check — five questions, no answers
1. A function that performs three independent memory allocations offers which guarantee if the third allocation fails after the first two have succeeded?
2. Why does adding `noexcept` to a move constructor sometimes improve the strong guarantee of a container operation even though the move itself does not throw?
3. Give a one-line counter-example showing that a destructor declared `noexcept(false)` can violate the basic guarantee of any container holding objects of that type.
4. A copy-and-swap assignment operator is written; the swap is `noexcept` but the copy constructor may throw. Which guarantee does the assignment provide?
5. In a real-time system every public method must be proven not to throw; which single keyword must appear on every such method and what runtime consequence follows if the proof is wrong?