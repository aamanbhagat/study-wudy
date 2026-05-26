## 1. The one-sentence answer
**MISRA C is a published set of coding rules that restrict the C language to a verifiable subset free of constructs known to produce undefined behaviour in safety-critical embedded systems.**

C was designed for flexibility and performance on early hardware, yet its specification leaves many operations undefined or implementation-defined. In domains where a single fault can kill people or destroy equipment, that latitude becomes unacceptable. MISRA C therefore enumerates 143 mandatory and advisory rules (MISRA C:2012 with Amendment 2) that eliminate the dangerous corners while still allowing the language to be compiled by ordinary C compilers. The result is source code whose observable behaviour is identical on every compliant implementation and whose static-analysis footprint is small enough for exhaustive verification.

The rules fall into three broad classes: those that remove undefined behaviour (for example, forbidding uninitialised automatic storage), those that enforce deterministic resource usage (no dynamic allocation after startup), and those that improve reviewability (mandatory function prototypes, restricted pointer arithmetic). Compliance is established by a combination of human review and commercial static analysers; the standard supplies a precise “compliance matrix” so that deviations can be documented and justified.

> [!NOTE]
> The decisive insight is that safety is achieved not by adding features but by subtracting the parts of C whose semantics cannot be decided at compile time or review time.

## 2. Why this matters — concrete and current
Toyota’s 2009–2011 unintended-acceleration investigation examined more than 200 000 lines of engine-control C; several MISRA violations were cited by the expert panel as contributing to the difficulty of proving absence of runaway tasks.  

Airbus A380 and A350 flight-control computers are developed under DAL-A objectives; the software suppliers must demonstrate that every C translation unit satisfies the MISRA C:2012 mandatory rules before the code enters the DO-178C verification chain.  

Bosch and Continental produce brake-by-wire and steering controllers certified to ISO 26262 ASIL-D; their coding standards are literally the MISRA C rule set with an additional 12 company-specific directives.  

The Mars 2020 Perseverance rover flight software adopted a MISRA C subset for all attitude-control modules; the Jet Propulsion Laboratory reported that the restricted language allowed the entire control law to be subjected to bounded model checking in under four hours.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| ISO C abstract machine   | Every MISRA rule is stated relative to the C standard’s notions of undefined behaviour and sequence points. |
| Embedded memory model    | Rules on dynamic allocation and pointer lifetime presuppose knowledge of RAM/ROM separation and startup code. |
| Static analysis          | Compliance arguments rely on decidable properties; familiarity with abstract interpretation and data-flow analysis is required to read tool reports. |
| Safety-integrity levels  | The decision whether a rule may be deviated is governed by the ASIL or DAL of the component. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Undefined behaviour is the root hazard
C permits operations whose effect the standard deliberately refuses to define. In a safety-critical program any such operation can produce arbitrary machine state.  
Example: `int x; printf("%d", x);` reads an indeterminate value.  
Formally: if an expression evaluates to indeterminate value or invokes an operation the standard labels undefined behaviour, the abstract machine may do anything.  
> [!WARNING] Treating “it usually works on my compiler” as evidence of defined behaviour will later produce a heisenbug that only appears after a toolchain upgrade.

### Step 2 — Replace runtime errors with compile-time prohibitions
MISRA converts many undefined-behaviour cases into compile-time violations by banning the syntactic forms that can produce them.  
Example: rule 9.1 forbids reading uninitialised objects; the rule is checked by requiring an initializer or a preceding definite assignment.  
The corresponding formal statement is: every automatic object must have a value before its first read in the abstract machine’s evaluation order.

### Step 3 — Constrain the type system to eliminate aliasing ambiguity
Unrestricted pointer arithmetic and type punning make alias analysis intractable. MISRA therefore limits pointer targets to a single declared object or to one-past-the-end of an array.  
Example: `int *p = &a[i]; p += 2;` is allowed only when the resulting address remains within the same array object.  
Formally: every pointer expression must have a statically determinable provenance that is either null or a pointer to a complete object.

### Step 4 — Enforce a single entry, single exit control-flow graph per function
Rule 15.5 bans multiple `return` statements; rule 15.1 bans `goto`. The resulting control-flow graph has exactly one exit node, enabling simple calculation of worst-case execution time and formal verification of post-conditions.  
The formal property required is that the function’s abstract syntax tree contains precisely one `return` statement that is reachable from every path.

### Step 5 — Guarantee resource usage is bounded before runtime
Rule 21.3 prohibits `malloc`/`free` after initialisation. The program therefore possesses a static memory map that can be checked against the target’s RAM size at link time.  
Formally: the set of live objects at any program point is a compile-time constant.

### Step 6 — Make the compliance argument machine-checkable
Each rule is accompanied by a decidable checking procedure. The final formalism is therefore a conjunction of 143 decidable predicates over the abstract syntax tree and the abstract machine state, together with a permitted-deviation mechanism that records the safety argument for each exception.

## 5. Worked examples — every step shown

**Example 1 — Uninitialised scalar**  
*Given:* `uint16_t calc(uint16_t x) { uint16_t y; if (x > 10) y = x * 2; return y; }`  
*Find:* MISRA violation.  
Step 1: Identify automatic object `y`.  
*Why* — Rule 9.1 applies to all automatic storage.  
Step 2: Observe that the path `x <= 10` reaches the `return` without an assignment to `y`.  
*Why* — The abstract machine performs a read of an indeterminate value.  
Step 3: Conclude violation of rule 9.1.  
**Final answer:** Mandatory violation; initialise `y` or restructure control flow.  

*Reflection:* The example shows that the rule is path-sensitive; a purely syntactic check would miss the bug.

**Example 2 — Pointer provenance**  
*Given:* `int a[10]; int *p = a + 10; int *q = p + 1;`  
*Find:* Rule 18.2 breach.  
Step 1: `p` points one past the end of `a`.  
*Why* — Allowed by C.  
Step 2: `q` is formed by adding 1 to `p`.  
*Why* — The resulting address lies outside the original array object.  
Step 3: Rule 18.2 requires every pointer arithmetic result to remain within the same array object.  
**Final answer:** Violation.

*Reflection:* The rule forces the programmer to keep array bounds explicit, which also aids static analysers.

**Example 3 — Multiple returns**  
*Given:* a 40-line function with three `return` statements.  
*Find:* Rule 15.5 violation.  
Step 1: Count `return` tokens.  
*Why* — Rule 15.5 is a simple syntactic count.  
Step 2: Observe three distinct exit nodes.  
*Why* — Control-flow graph now has multiple sinks.  
Step 3: Refactor into a single return at the end with a status variable.  
**Final answer:** Refactored function is compliant.

*Reflection:* The change increases reviewability even though it lengthens the function slightly.

**Example 4 — Dynamic allocation after startup**  
*Given:* `void isr(void) { int *p = malloc(sizeof(int)); … }`  
*Find:* Rule 21.3 violation.  
Step 1: `malloc` appears in a non-initialisation context.  
*Why* — Rule 21.3 forbids the call after program start.  
Step 2: The allocation can fail or fragment memory at runtime.  
*Why* — Both outcomes are non-deterministic.  
**Final answer:** Replace with static buffer.

*Reflection:* The rule moves the resource decision from runtime to link time.

## 6. Common traps and how to avoid them

| Trap                                | Why it happens                              | How to avoid it                                      |
|-------------------------------------|---------------------------------------------|------------------------------------------------------|
| Treating advisory rules as optional | “Advisory” sounds non-mandatory             | Map every advisory rule to a project-specific requirement or document explicit deviation. |
| Ignoring the “essentially signed” type model | Developers forget that plain `char` may be signed | Always use the exact typedefs from `misra_types.h`. |
| Assuming the compiler catches everything | Many rules are undecidable by the compiler alone | Run a qualified MISRA checker; do not rely on `-Wall`. |
| Overusing `#pragma` to silence warnings | Convenient but hides real defects           | Require peer review of every suppression.            |
| Forgetting that macro expansion can create violations | Macros textually substitute before parsing | Expand macros manually in review or use a pre-processor-aware analyser. |
| Believing “we never use that construct” without measurement | Confirmation bias                           | Run the checker on the whole codebase from day one.  |
| Deviating a rule without a safety argument | Pressure to ship                              | Require a formal deviation record citing the hazard analysis. |

## 7. The textbook-precise statement
MISRA C:2012 (with Amendment 2 and MISRA Compliance:2020) defines a C subset \( S \) such that for every program \( P \) written in \( S \), every execution trace of \( P \) on any conforming implementation is a trace permitted by the ISO C abstract machine under the additional constraints listed in the 143 rules. The standard is published by the Motor Industry Software Reliability Association; the normative reference is “MISRA C:2012 – Guidelines for the use of the C language in critical systems”, ISBN 978-1-906400-21-8.

## 8. Visual — diagram or schematic
```text
Source files
     │
     ▼
MISRA-C static analyser (rules 1–143)
     │
     ├─► Violations → Deviation record (safety argument)
     │
     ▼
Compliance matrix (mandatory / advisory / NA)
     │
     ▼
Qualified compiler + linker
     │
     ▼
Object code + memory map (static allocation verified)
```

## 9. The memory technique

1. **The hook** — Picture a medieval castle whose drawbridge is raised; the only way in is through a single, well-lit gate. The gate is the single `return`; the raised bridge is the ban on `malloc` and `goto`.
2. **What to overlearn** — The six directive numbers that cover 80 % of defects: 9.1 (initialisation), 11.1–11.6 (pointer conversion), 15.1–15.7 (control flow), 18.1–18.4 (pointer arithmetic), 21.3 (allocation), 22.1–22.10 (error handling).
3. **Spaced-repetition schedule** — Review the six directives at 1 day, 3 days, 7 days, 16 days, 35 days after first study.
4. **First-principles fallback** — Re-derive any forgotten rule by asking: “Does this construct leave an observable behaviour that the C standard refuses to define?”

## 10. What this unlocks
Mastery of MISRA C supplies the disciplined subset required for the next layer of verification: model-based code generation, formal proof of absence of runtime errors, and certified compilation.  

- MISRA C++ 2008 / 2023  
- ISO 26262 Part 6, Table 6 — “Methods for the verification of software architectural design”  
- DO-178C source-code verification objectives  
- Sound static analysers (Astrée, Polyspace, TrustInSoft)  
- WCET analysis with static memory maps  

## 11. Self-check — five questions, no answers
1. A function contains the line `return (x > 0) ? a : b;`. Does this violate rule 15.5?  
2. Explain why rule 18.4 permits `p = &a[0]` but forbids `p = (int *)((char *)a + 3)`.  
3. An automotive ASIL-B module uses a single `malloc` at startup to create a lookup table. Is this permitted under rule 21.3?  
4. A developer suppresses a rule-9.1 warning with a cast to `(volatile uint32_t)`. Why is this still non-compliant?  
5. Given a 200-line function that has been automatically transformed to a single-exit form, list two new hazards that the transformation itself may have introduced.