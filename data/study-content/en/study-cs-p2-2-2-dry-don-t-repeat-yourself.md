## 1. The one-sentence answer
**DRY states that every piece of knowledge must have a single, unambiguous representation in a system.**

Duplication of logic, data, or structure forces the same change to be made in multiple places. When those places drift out of sync, defects appear that are expensive to locate. The principle therefore directs the programmer to locate repeated fragments and collapse them into one authoritative source—whether that source is a function, a constant, a class, or a configuration file.

A second consequence follows directly: once knowledge resides in only one place, any modification automatically propagates everywhere it is needed. This reduces both the surface area for error and the cognitive load of maintaining the codebase.

> [!NOTE]
> The deepest insight is not “avoid typing the same characters twice,” but “ensure that a single fact about the problem domain never needs to be stated more than once.”

## 2. Why this matters — concrete and current
The Linux kernel’s device-driver subsystem once contained hundreds of near-identical register-access macros scattered across architecture-specific directories; a single bug fix required coordinated patches in more than thirty files. After consolidation into a single set of inline helpers, the same fix became a one-line change and the rate of register-related defects dropped measurably in subsequent releases.

Google’s internal monorepo applies a DRY-enforcing build system (Bazel) that extracts common library versions into canonical targets. When a security vulnerability is discovered in a transitive dependency, a single version bump in the central rule file updates every binary that links against it, eliminating the window in which some services remain exposed.

In the training pipelines of large language models at OpenAI and Anthropic, data-preprocessing logic (tokenization, masking, sequence packing) is factored into a single library rather than copied into each experiment script. A change to the masking schedule therefore affects every ablation study identically, guaranteeing that observed performance differences arise from model architecture rather than from divergent data pipelines.

Modern semiconductor design tools such as Synopsys VCS maintain a single, parameterized timing model for each standard-cell library. Because the model is not duplicated inside every verification testbench, an update to cell delay values propagates automatically to static-timing analysis, power estimation, and formal verification runs, preventing the classic “timing model mismatch” escape that has caused multiple tape-out failures in the industry.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Abstraction              | DRY is achieved by raising duplicated code to a higher-level named entity. |
| Scope and binding        | A single source of truth must be reachable from every use site without accidental shadowing. |
| Refactoring safety       | Mechanical extraction of duplicates must preserve observable behavior; tests and static analysis provide that guarantee. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Spot the repeated fragment
Two or more regions of source text express identical domain knowledge.  
Example: the literal `3.1415926535` appears in three separate geometry routines.  
Formally, let \(K\) be a fragment of program text; if there exist distinct locations \(l_1, l_2\) such that the semantics of \(K\) at \(l_1\) equal those at \(l_2\), duplication exists.  
> [!WARNING]
> Treating only textual identity as duplication misses semantic clones that differ only in formatting or variable names.

### Step 2 — Name the knowledge
Assign the repeated fragment a single identifier that stands for the underlying fact.  
Example: replace every occurrence of the literal with the constant `PI`.  
Formally, introduce a binding \(b \leftarrow K\) and replace each use site with a reference to \(b\).

### Step 3 — Centralize the binding
Place the binding in exactly one syntactic location that all reference sites can reach.  
Example: move `PI` into a header included by every translation unit.  
Formally, the binding must lie in a scope that dominates every use site in the static call graph.

### Step 4 — Eliminate all other copies
Remove every remaining textual or semantic copy of \(K\).  
If any copy remains, the single-source guarantee is already broken.

### Step 5 — Verify propagation
Any edit to the authoritative binding must be sufficient to update all dependent behavior.  
This is checked by recompilation and execution of the test suite that exercises every former duplication site.

### Step 6 — Reify the principle
The DRY principle asserts that for every distinct piece of domain knowledge \(d\) there exists exactly one program element \(e\) such that the meaning of \(d\) is defined solely by \(e\) and every use of \(d\) is obtained by reference to \(e\).

## 5. Worked examples — every step shown

**Example 1 — Magic number**  
*Given:* Three functions each contain the literal `0.3048`.  
*Find:* A DRY-compliant form.  
Replace every literal with `METERS_PER_FOOT`.  
*Why* — the numeric value now appears once.  
Declare `const double METERS_PER_FOOT = 0.3048;` at module scope.  
*Why* — the binding is reachable from all three call sites.  
Delete the three original literals.  
*Why* — no duplicate remains.  
**METERS_PER_FOOT**  
*Reflection* — The example is trivial yet illustrates that even a single constant satisfies the definition; the same discipline scales to larger fragments.

**Example 2 — Validation logic**  
*Given:* An email check appears verbatim in both `registerUser` and `updateProfile`.  
*Find:* Single representation.  
Extract the check into `bool isValidEmail(std::string_view s)`.  
*Why* — the algorithm is now named and defined once.  
Call the new function from both sites.  
*Why* — textual duplication is removed.  
Add unit tests only against `isValidEmail`.  
*Why* — future changes are verified at a single point.  
**isValidEmail**  
*Reflection* — The extracted function becomes the canonical statement of “what constitutes a valid email,” satisfying DRY at the semantic level.

**Example 3 — Configuration schema**  
*Given:* A JSON schema fragment describing a `timeout` field is duplicated across five micro-service repositories.  
*Find:* One source.  
Publish the fragment in an internal package `@company/schemas`.  
*Why* — the package version becomes the single binding.  
Depend on that package from every service.  
*Why* — any version bump updates all consumers atomically.  
Remove the inline copies.  
*Why* — drift is now impossible.  
**@company/schemas v2.3.1**  
*Reflection* — DRY here crosses repository boundaries; the principle is independent of physical file layout.

**Example 4 — Derived state in a class hierarchy**  
*Given:* `Rectangle` and `Square` both compute `area()` by multiplying width and height.  
*Find:* One computation.  
Place `area()` only in the base `Shape` class using the two dimensions.  
*Why* — the formula is stated once.  
Delete the overrides.  
*Why* — the derived value is obtained uniformly.  
**area() defined solely in Shape**  
*Reflection* — The example shows that DRY interacts with inheritance; overriding would have re-introduced duplication of intent.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Over-abstraction of trivial literals | Fear of any repetition leads to needless indirection | Apply DRY only when the duplicated fragment carries domain meaning |
| “Copy–paste–tweak” inheritance | Subclass created merely to alter one constant | Prefer composition or a single configurable base |
| String duplication in tests | Test data written ad-hoc for each case      | Generate test fixtures from the same source used by production |
| Duplicated SQL in DAOs      | Each repository author writes similar queries | Centralize query construction in a query-builder or repository base |
| Magic configuration keys    | Keys repeated across YAML files and code    | Generate constants from a single schema definition |
| Temporal duplication        | Same algorithm re-implemented in two sprints because the first instance was not discoverable | Maintain an internal catalog of utility modules with searchable names |
| Premature DRY across bounded contexts | Different sub-domains share superficially similar logic | Keep separate representations until a true shared kernel is proven |

## 7. The textbook-precise statement
In *The Pragmatic Programmer*, 20th Anniversary Edition, §2.2, Hunt and Thomas state: “Every piece of knowledge must have a single, unambiguous, authoritative representation within a system.” The principle applies to any representation of domain knowledge—algorithms, constants, data formats, or invariants—and is violated precisely when a change to that knowledge requires edits at more than one syntactic location.

## 8. Visual — diagram or schematic
```text
Knowledge "K"
      │
      ▼
+-------------+     references
| authoritative binding b |
+-------------+
      ▲               ▲               ▲
      │               │               │
   site1           site2           site3
(no copies of K remain)
```
The diagram shows a single binding node with arrows pointing outward to every use site; the absence of any other node containing K encodes the DRY invariant.

## 9. The memory technique
1. **The hook** — Picture a single golden tablet engraved with the fact; every program location merely consults the tablet rather than carving its own copy.
2. **What to overlearn** — The exact phrasing “single, unambiguous, authoritative representation”; the rule that a change must be sufficient at one site.
3. **Spaced-repetition schedule** — Review the definition after 1 day, 3 days, 7 days, 16 days, 35 days, each time locating one duplication in a recent commit and removing it.
4. **First-principles fallback** — Ask: “If this fact changes tomorrow, how many places must I edit?” If the answer exceeds one, the binding is not yet unique.

## 10. What this unlocks
Mastery of DRY supplies the mechanical discipline required by every subsequent design principle that eliminates redundancy.  
- It is a prerequisite for the Single-Responsibility Principle, because a class that contains duplicated logic is already doing more than one job.  
- It directly enables the Open–Closed Principle by ensuring that new behavior is obtained through extension of the single source rather than modification of copies.  
- It is the foundation of template-method and strategy patterns, which factor algorithms so that only the variable parts are supplied by subclasses or injected objects.

## 11. Self-check — five questions, no answers
1. Identify every duplicated literal or expression in a 50-line module you wrote last week; count how many distinct facts they represent.  
2. Suppose a constant `MAX_CONNECTIONS` appears in both a server configuration file and an embedded client. Which single location satisfies DRY while still allowing independent deployment?  
3. A colleague extracts a five-line helper that is called from only one place. Does this change increase or decrease overall duplication? Justify in one sentence.  
4. In a code base where every SQL statement is generated from a single schema object, a new column is added to a table. How many source files must be touched to keep queries consistent?  
5. Construct a minimal counter-example in which two functions appear textually identical yet must remain separate to respect distinct bounded contexts; explain why merging them would violate a deeper principle than DRY.