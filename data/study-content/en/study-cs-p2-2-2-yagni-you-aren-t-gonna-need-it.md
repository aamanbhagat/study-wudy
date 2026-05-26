## 1. The one-sentence answer
**YAGNI states that a developer should implement a capability only when it is demonstrably required by a current, concrete need.**

The principle counters the natural tendency of programmers to anticipate future requirements and build supporting machinery in advance. In practice this anticipation almost always rests on incorrect assumptions about what the future will actually demand, producing code that must later be maintained, tested, and understood even though it never delivers value. The cost is not merely the extra lines written; it is the permanent drag those lines impose on every subsequent change.

When a requirement finally arrives, the simplest correct implementation is almost always smaller and clearer than the speculative version that was written earlier. The extra abstractions, configuration points, and extension hooks that seemed prudent at the time now become obstacles that must be removed or worked around. YAGNI therefore replaces prediction with responsiveness: build exactly what the present requirement needs, then stop.

> [!NOTE]
> The decisive insight is that the probability of correctly guessing which extra features will be needed is low enough, and the cost of carrying unused code is high enough, that the rational policy is deliberate under-engineering until evidence appears.

## 2. Why this matters — concrete and current
In the development of the Linux kernel, maintainers repeatedly reject patches that add infrastructure “just in case” a new architecture or device class appears. The result is a codebase whose core remains small enough for a few hundred developers to review every change.

Google’s internal style guides for C++ and Java explicitly instruct engineers to delete code that is not exercised by any test or production traffic. The policy emerged after several large projects accumulated layers of unused generic frameworks whose maintenance cost eventually exceeded the cost of re-implementing the few features that actually proved necessary.

The Mars Perseverance rover flight software team at JPL adopted a strict “fly what you test, test what you fly” rule. Any abstraction introduced without an immediate driving requirement had to be justified against the risk of introducing an untestable code path on a vehicle that cannot be patched after launch.

Modern microservice architectures at Netflix illustrate the same lesson at scale: early services that were built with elaborate plugin systems for hypothetical scaling scenarios were later replaced by simpler services once real traffic patterns became visible. The replacement effort was smaller than the ongoing cost of the speculative designs.

## 3. Mental prerequisites

| Concept                  | Why you need it here |
|--------------------------|----------------------|
| **Requirement**          | YAGNI is defined relative to an actual, accepted requirement; without this anchor the principle is meaningless. |
| **Cost of code**         | Every line imposes future reading, testing, and debugging cost; understanding this cost makes the decision to omit code rational rather than lazy. |
| **Refactoring**          | The ability to add the missing capability cleanly later is what makes deferral safe; without refactoring skill, YAGNI becomes risky procrastination. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Distinguish prediction from evidence
A programmer often feels certain that a feature will be needed soon. The feeling is not evidence; only an accepted requirement or a failing test constitutes evidence.  
Example: A developer adds an abstract `Logger` interface and three implementations because “we will probably need file, network, and database logging.” No requirement yet exists for anything beyond console output.  
Formal statement: Implement a construct if and only if at least one concrete requirement or test case demands its observable behaviour.  
> [!WARNING]
> Treating “we will probably need it” as a requirement silently converts a guess into an obligation without ever recording the guess as such.

### Step 2 — Measure the carrying cost of unused code
Every added class, method, or configuration option must be read, compiled, and mentally modelled by every subsequent reader.  
Example: The extra `Logger` hierarchy adds 400 lines that appear in every code review and in the IDE’s auto-complete list, even though only one implementation is ever instantiated.  
Formal statement: Let \(C\) be the set of all constructs whose behaviour is never observed by any requirement; the maintenance burden is proportional to \(|C|\).  
> [!WARNING]
> Developers systematically underestimate \(|C|\) because they only count the lines they themselves wrote, not the cumulative attention those lines will later demand.

### Step 3 — Compare the cost of deferral against the cost of removal
Adding the capability later requires a bounded amount of new work. Removing an incorrect abstraction later requires both removal and repair of any code that depended on it.  
Example: Adding file logging when the requirement appears takes two hours. Removing the unused abstract `Logger` and its two phantom implementations takes two days and breaks three downstream test suites.  
Formal statement: If \(D\) is the cost of implementing on demand and \(R\) is the cost of removing an unused construct plus repairing dependents, then \(D < R\) in the large majority of observed cases.  
> [!WARNING]
> The inequality is reversed only when the deferred work truly cannot be performed without the earlier scaffolding—an empirical claim that must be demonstrated, not assumed.

### Step 4 — Anchor decisions to the current increment
Work proceeds in small, verified increments. A construct belongs in the current increment only when it is required by that increment’s acceptance criteria.  
Example: The current user story asks for timestamped console messages. The `Logger` interface is therefore out of scope until a subsequent story introduces a second output destination.  
Formal statement: A construct is in scope for increment \(I\) exactly when it is necessary for at least one acceptance test of \(I\).  
> [!WARNING]
> Allowing “preparatory” code into increment \(I\) reintroduces prediction under a new name and defeats the increment’s bounding function.

### Step 5 — State the principle without remainder
The preceding steps together yield the operational rule used by practitioners of Extreme Programming and by subsequent agile methods.  
Formal statement (Beck, *Extreme Programming Explained*, 2e, p. 30): “Always implement the features you need, never the features you merely foresee.”

## 5. Worked examples — every step shown

**Example 1 — Single-method class**  
*Given:* A requirement to compute the area of a rectangle for a simple report.  
*Find:* The minimal implementation.  
Create a function `rectArea(w, h)`.  
*Why* — The requirement mentions only rectangles.  
No class, no interface, no `Shape` hierarchy.  
*Why* — Any additional type would be unused by the acceptance test.  
**Final answer**  
```python
def rectArea(w, h):
    return w * h
```
*Reflection* — The example is trivial yet illustrates how the presence of a single concrete test removes all justification for surrounding machinery.

**Example 2 — Premature configuration**  
*Given:* A service must return user profiles; the team anticipates supporting multiple database back-ends.  
*Find:* The correct first implementation.  
Write the query directly against the single production database using the driver already present in the codebase.  
*Why* — No requirement yet exists for a second back-end.  
**Final answer**  
A single, concrete repository class containing the SQL.  
*Reflection* — The configuration system that would have been built to select among drivers would itself have become the first piece of code needing maintenance.

**Example 3 — Unused extension point**  
*Given:* A requirement to send an email on user registration.  
*Find:* Whether to introduce an `EmailSender` interface.  
Implement the mail call inline using the language’s standard library.  
*Why* — Only one sending mechanism is required today.  
**Final answer**  
Seven lines of direct SMTP code inside the registration handler.  
*Reflection* — The interface would have forced every future reader to understand a level of indirection whose second implementation never arrived.

**Example 4 — Retrospective removal**  
*Given:* A codebase already contains an elaborate plugin registry added “for future extensions.” Six months later only one plugin exists.  
*Find:* The action that satisfies YAGNI.  
Delete the registry and fold the single plugin’s logic directly into the call site.  
*Why* — The registry’s only client is the one plugin; the indirection cost is now measurable.  
**Final answer**  
A net reduction of 1200 lines and the removal of two configuration files.  
*Reflection* — The cost of removal became visible only after the speculative code had already been written; YAGNI prevents the cost from arising in the first place.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| “It’s only a little extra code” | Small additions feel cheap locally while their cumulative cost is invisible. | Require an explicit requirement or test for every new construct before the code is written. |
| Re-labelling speculation as “flexibility” | The word “flexible” carries positive connotations and masks the absence of a driving requirement. | Replace the claim “this makes the code flexible” with the question “which test will fail if this construct is omitted today?” |
| Building for the second customer before the first ships | Engineers enjoy generalisation and postpone the mundane work of finishing the current feature. | Tie every check-in to a single user story; refuse merges whose only justification is future stories. |
| Keeping dead code “just in case” | Deletion feels like destruction; retention feels conservative. | Adopt an automated dead-code detector and delete any construct that has not been executed in the last release cycle. |
| Over-generalising data structures | Developers copy textbook patterns (Visitor, Strategy, etc.) without a concrete multiplicity of cases. | Implement the first case with a direct conditional or simple method; introduce the pattern only when a second, distinct case appears. |
| Confusing YAGNI with refusal to refactor | The principle is misread as “never change anything later.” | Pair YAGNI with the rule that any later requirement must be implemented by the simplest clean code, which may include refactoring. |
| Applying YAGNI to the wrong granularity | Teams omit necessary infrastructure (logging, monitoring) because no single story mentions it. | Distinguish between application features and the minimum viable platform; YAGNI applies to the former, not the latter. |

## 7. The textbook-precise statement
YAGNI is an engineering heuristic, not a theorem. Its canonical formulation appears in Kent Beck’s *Extreme Programming Explained*, 2nd edition (Addison-Wesley, 2004), page 30: “Always implement the features you need, never the features you merely foresee.” The surrounding text makes the hypothesis explicit: the cost of carrying unused capability exceeds the expected value of early preparation in the presence of both imperfect foresight and the ability to refactor.

## 8. Visual — diagram or schematic
```text
Requirement R1 ──► Implement construct C1 only
                       │
                       ▼
                 Acceptance test T1 passes
                       │
                       ▼
Next requirement R2 ──► Implement C2 (or refactor C1)
```
The diagram shows that each construct is introduced strictly after its driving requirement and test exist; no forward arrow from future requirements to present code is permitted.

## 9. The memory technique
1. **The hook** — Picture a carpenter who carries only the tools needed for the board in front of him; every unused tool in the belt adds weight and slows the next cut.  
2. **What to overlearn** — The single sentence “No requirement, no code.”  
3. **Spaced-repetition schedule** — Review the definition after 1 day, 3 days, 7 days, 16 days, and 35 days, each time by examining the most recent commit and asking which constructs could have been omitted.  
4. **First-principles fallback** — Re-derive the rule from the two premises that (a) every line imposes future cost and (b) prediction accuracy is low; the only safe policy is to wait for evidence.

## 10. What this unlocks
Mastery of YAGNI removes the largest single source of accidental complexity in object-oriented designs, allowing subsequent principles—Open/Closed, Dependency Inversion, and the full catalogue of design patterns—to be applied only where they are earned rather than pre-emptively.  

- It makes the Single Responsibility Principle enforceable, because a class cannot be accused of having too many responsibilities if it contains only the code required by today’s tests.  
- It supplies the precondition for safe application of the Open/Closed Principle: a module can be left open for extension only after a second requirement has demonstrated the need for extension points.  
- It reduces the cognitive load of Dependency Injection containers, which otherwise accumulate registrations for abstractions that have only one implementation.

## 11. Self-check — five questions, no answers
1. A colleague proposes adding a generic `EventBus` to a module that currently emits one hard-coded notification. Which single question would you ask to decide whether the proposal violates YAGNI?  
2. You discover a 300-line utility class whose only caller is a test that could be rewritten in four lines. What is the YAGNI-compliant action, and what risk does it carry?  
3. In a three-person start-up the team decides to implement a pluggable authentication system supporting five providers before any user has signed up. Name the concrete cost that will appear first.  
4. A performance requirement arrives after the product has shipped. Explain why YAGNI does not forbid writing an optimised algorithm at that moment.  
5. Formulate a precise acceptance criterion that would allow a developer to introduce an abstract factory without violating YAGNI.