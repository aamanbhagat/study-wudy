## 1. The one-sentence answer
**Refactoring** is the disciplined restructuring of existing code to improve its internal structure while preserving external behaviour exactly.

Iska matlab yeh hai ki aap code ko cleaner, readable aur maintainable banate ho bina kisi feature ko todhe. Har change chhote, safe steps mein hoti hai jisse tests fail na karein. Aap pehle smell detect karte ho, phir ek specific refactoring apply karte ho, aur har step ke baad tests run karte ho.

> [!NOTE]
> The core "aha" is that refactoring never adds new behaviour; it only rearranges what already exists so future changes become cheaper.

## 2. Why this matters — concrete and current
Google’s monorepo contains more than 2 billion lines; daily refactoring passes keep build times and merge conflicts manageable across thousands of engineers.

In the Mars Perseverance rover flight software, NASA teams applied repeated Extract Method and Rename refactorings to the autonomy module so that radiation-induced single-event upsets could be isolated without rewriting control logic.

Modern ML training frameworks such as JAX rely on heavy refactoring of array-computation graphs; the “extract primitive” pattern lets researchers swap fused kernels without altering numerical results.

Semiconductor design houses like TSMC use automated rename-and-extract passes on their hardware-description-language codebases to meet ISO-26262 traceability rules while tape-out deadlines shrink.

Airbus flight-control teams refactor Ada packages every sprint so that DO-178C certification evidence remains consistent when new redundancy modes are introduced.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Unit tests           | Only tests give you permission to change structure safely |
| Basic control flow   | You must recognise duplicated logic and long methods      |
| Scope and binding    | Rename and Extract Method alter identifier visibility     |
| Static typing basics | Type checkers catch many accidental behaviour changes     |

Agar unit testing pehle nahi padha to pause karke woh padho.

## 4. Building the idea — from intuition to formalism

### Step 1 — Spot the smell
Aap code mein woh patterns dhundte ho jo future changes ko costly banate hain.  
Example: ek 80-line method jo file read, parse aur validate sab karti hai.  
Formal: A method \(M\) exhibits the Long Method smell when \(\text{LOC}(M) > T\) for some threshold \(T\) chosen by team policy.  
> [!WARNING]  
> Agar aap smell ko sirf size se judge karoge to meaningful single-responsibility methods bhi galat tarah se tod sakte ho.

### Step 2 — Name the target refactoring
Har smell ka ek canonical refactoring hota hai. Long Method ke liye Extract Method use hota hai.  
Formal: Extract Method replaces a contiguous fragment \(F\) inside \(M\) by a new method \(M'\) whose body is \(F\) and whose call site replaces \(F\).

### Step 3 — Preserve semantics
Aap mechanical steps follow karte ho: create new method, copy fragment, replace original fragment by call, run tests.  
Formal: \(\forall\) inputs \(x\), \(\text{behaviour}(M,x) = \text{behaviour}(M',x)\).

### Step 4 — Apply Rename
After extraction, parameter aur variable names often become misleading. Rename restores intent.  
Formal: Rename identifier \(id_1\) to \(id_2\) updates all bound occurrences while preserving static resolution.

### Step 5 — Repeat with larger smells
Once local methods are clean, class-level smells (Feature Envy, Data Clumps) ko Extract Class se address karte ho.  
Formal: Extract Class moves a subset of fields and methods into a new class \(C'\) and replaces original references by delegation.

### Step 6 — Verify with regression suite
Har refactoring ke baad full test suite must pass; otherwise revert.  
Formal: Let \(T\) be the test suite; \(\forall t\in T\), \(t\) passes before and after the transformation.

### Step 7 — Commit with intent
Each commit contains exactly one refactoring plus its test updates so history remains bisectable.

## 5. Worked examples — har step show karo

**Example 1 — Extract Method on price calculation**  
*Given:*  
```java
double price(int qty, double unit) {
  double base = qty * unit;
  if (qty > 100) base *= 0.9;
  return base + 10; // shipping
}
```
*Find:* Extract the discount logic.  
Step 1: Create new method `applyDiscount`.  
Step 2: Move the if block.  
Step 3: Replace original fragment by call.  
*Why:* Single responsibility principle now holds for the caller.  
**Final answer**  
```java
double price(int qty, double unit) {
  double base = qty * unit;
  base = applyDiscount(qty, base);
  return base + 10;
}
double applyDiscount(int qty, double base) {
  if (qty > 100) return base * 0.9;
  return base;
}
```
*Reflection:* The example was simple yet shows that even tiny extractions remove duplication when the same discount rule appears elsewhere.

**Example 2 — Rename across a module**  
*Given:* variable `d` holding days since last login.  
*Find:* Make intent explicit.  
Step-by-step replacement of every `d` by `daysSinceLogin` while compiler checks binding.  
**Final answer** All occurrences now read `daysSinceLogin`.  
*Reflection:* Rename is the cheapest refactoring yet prevents whole classes of onboarding bugs.

**Example 3 — Extract Class from God class**  
*Given:* `Order` class holding customer address fields plus order totals.  
*Find:* Move address behaviour to `Address` class.  
After moving fields and updating references, delegation methods remain for backward compatibility.  
**Final answer** `Order` now holds only an `Address` reference.  
*Reflection:* Feature Envy smell disappears because address formatting now lives with its data.

**Example 4 — Composite refactoring (Extract + Rename + Inline Temp)**  
*Given:* nested conditionals with temporary variables.  
Apply three refactorings in sequence; each intermediate state is tested.  
**Final answer** Resulting method is six lines and intention-revealing.  
*Reflection:* Stacking small refactorings safely scales to large legacy modules.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                          | How to avoid it                              |
|-----------------------------|-----------------------------------------|----------------------------------------------|
| Skipping tests after rename | Overconfidence that rename is trivial   | Run full suite even for identifier changes   |
| Extracting the wrong fragment | Missing the true duplication boundary   | Look for cohesive comments or blank lines    |
| Over-refactoring in one commit | Desire to finish everything at once     | One logical change per commit                |
| Ignoring package-private visibility | Language-specific binding rules         | Let compiler or IDE warn before manual edit  |
| Refactoring without characterisation tests | Legacy code has no unit tests           | Write high-level scenario tests first        |
| Premature Extract Class     | Misreading temporary data clumps        | Wait until three or more methods need same data |

## 7. The textbook-precise statement
“Refactoring is a change made to the internal structure of software to make it easier to understand and cheaper to modify without changing its observable behavior.” (Fowler, *Refactoring: Improving the Design of Existing Code*, 2e, §1.1). The transformation must be behaviour-preserving: for every input in the domain, the output and all observable side-effects remain identical. Each atomic refactoring is accompanied by a set of preconditions (for example, no name collision after Rename) and a set of postconditions verified by regression tests.

## 8. Visual — diagram or schematic
```text
Before:                    After Extract Method
+------------------+       +------------------+
| longMethod()     |       | longMethod()     |
|   ...            |       |   ...            |
|   calcDiscount() | ----> |   calcDiscount() |
|   ...            |       |   ...            |
+------------------+       +------------------+
                           +------------------+
                           | calcDiscount()   |  <-- new method
                           +------------------+
```
Arrow shows fragment movement; dashed box indicates new scope boundary.

## 9. The memory technique
1. **The hook** — Picture code as a messy cupboard; refactoring is simply tidying drawers without throwing anything away.
2. **What to overlearn** — “Tests must pass after every single mechanical step” and the two-word names: Extract Method, Rename Variable, Inline Temp.
3. **Spaced-repetition schedule** — Review the catalogue of smells at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — If you forget a refactoring name, ask: “Which smell is hurting readability right now?” then mechanically isolate that fragment into its own named entity.

## 10. What this unlocks
Refactoring skill lets you evolve large codebases safely, which is prerequisite for continuous delivery, clean architecture, and legacy modernisation.

- Domain-driven design aggregate boundaries become enforceable once code is refactored into cohesive modules.
- Test-driven development cycles rely on frequent Extract Method to keep tests fast.
- Static analysis tools (SonarQube, Infer) report fewer false positives after systematic smell removal.

## 11. Self-check — five questions, no answers
1. A 120-line method contains three distinct responsibilities separated by blank lines. Which single refactoring reduces its size most directly?
2. After renaming a parameter from `x` to `userId`, one test starts failing. What is the most likely root cause?
3. You see five methods in class `Order` that all take the same three parameters `street`, `city`, `zip`. Name the smell and the target refactoring.
4. Why must every refactoring step be followed by a full test run even when the IDE claims the change is semantics-preserving?
5. Given a Feature Envy smell where a method uses far more data from another class than its own, outline the sequence of two refactorings that removes the envy without altering behaviour.