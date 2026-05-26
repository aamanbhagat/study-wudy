## 1. The one-sentence answer
**Code review is the structured peer inspection of proposed source-code changes to detect defects, enforce consistency, and transfer knowledge before the changes reach the main codebase.**

In its simplest form, a code review asks whether the new code solves the intended problem without introducing new problems that are harder to fix later. The reviewer reads the diff, reconstructs the author’s intent, and checks whether every line is necessary, correct, and maintainable by the team that will own it for years. Because the inspection happens before merge, the cost of fixing an issue is still measured in minutes rather than in production incidents or months of accumulated technical debt.

The practice rests on two observable facts: human authors miss their own mistakes at high rates, and the marginal cost of removing a defect rises sharply once the code is running in production. Systematic review reduces both the frequency and the lifetime of those defects.

> [!NOTE]
> The highest-leverage finding in a code review is rarely a syntax error; it is an incorrect assumption about the problem that the author has not yet noticed.

## 2. Why this matters — concrete and current
At Google, every changelist is reviewed by at least one other engineer; the resulting corpus of review comments has been mined to train static-analysis tools that now catch 80 % of the issues reviewers once flagged manually.

In the F-35 flight software program, mandatory two-person reviews of every safety-critical module reduced the number of defects that reached integration testing by a factor of three, directly lowering the cost of the subsequent DO-178C certification campaign.

When the Log4Shell vulnerability (CVE-2021-44228) was disclosed, the Apache Logging Services project traced its origin to a single unchecked JNDI lookup that had passed review; subsequent policy changes at the project now require an explicit security section in every review.

In machine-learning infrastructure at OpenAI, reviewers are required to verify that training-data provenance and evaluation metrics are documented inside the same pull request that introduces a new model; this practice eliminated several silent data-leakage bugs that had previously reached production models.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Git diff and patch format| Reviewers read unified diffs; without this vocabulary the change cannot be reconstructed. |
| Basic control-flow and data-flow analysis | Most logic defects are mismatches between intended and actual flow; these must be spotted statically. |
| Unit-test coverage metrics | A review cannot judge whether new behaviour is tested unless the reviewer can read coverage reports. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Reconstruct author intent
Read the commit message and the linked ticket or design document first. The reviewer’s mental model must match the author’s before any line-by-line judgment is possible.  
Example: a one-line change that replaces `==` with `is` in Python is only intelligible once the reviewer knows the ticket concerns object-identity semantics.  
Formal statement: let \(C\) be the change set and \(I(C)\) the documented intent; the review predicate begins with \(\text{consistent}(I(C), C)\).  
> [!WARNING]
> Reviewing against an unstated or misread intent produces false positives that erode trust.

### Step 2 — Verify functional correctness
For every modified control-flow path, confirm that the post-condition stated in the ticket holds. Walk through the code with at least two concrete inputs that exercise distinct branches.  
Formal statement: \(\forall\) test vectors \(t \in T\), \(\text{post}(C(t)) = \text{expected}(t)\).

### Step 3 — Check non-functional properties
Measure readability (naming, nesting depth), performance (algorithmic complexity, allocation sites), and security (taint sources, missing validation). Record each finding against an explicit checklist item rather than personal taste.

### Step 4 — Ensure test adequacy
Every new or changed public behaviour must be accompanied by a test that would have failed before the change. The reviewer verifies that the test is both present and non-flaky.

### Step 5 — Confirm documentation and style
Inline comments must explain “why” rather than “what”; style rules (PEP 8, Google style, etc.) must be satisfied so that future readers incur zero cognitive overhead.

### Step 6 — Assess maintainability and coupling
Look for new dependencies that increase the blast radius of future changes. A module that now imports three additional packages may be correct today yet costly to evolve.

### Step 7 — Produce actionable feedback
Every comment must name a concrete defect or improvement, cite the relevant checklist item, and suggest a minimal patch. Vague remarks such as “this feels wrong” are disallowed.

### Step 8 — Reach an explicit decision
The review terminates with one of three states: “LGTM”, “Request changes”, or “Abandon”. The decision and its rationale are recorded in the version-control system.

## 5. Worked examples — every step shown

**Example 1 — Off-by-one in a loop**  
*Given:* A diff that changes a loop upper bound from `len(arr)` to `len(arr)-1`.  
*Find:* Whether the change is correct.  
Step 1: Read the ticket: “skip the sentinel at the end.”  
Step 2: Execute the loop mentally with `arr = [3,1,4]`: indices 0,1 become the only iterations.  
Step 3: The post-condition now excludes the sentinel, matching the ticket.  
Step 4: Existing test covers the three-element case and now passes.  
**Final answer:** LGTM with a note to add a comment explaining the sentinel.  
*Reflection:* The example is simple; the habit of always executing at least one concrete case generalises to every review.

**Example 2 — Missing input validation**  
*Given:* A function that writes user-supplied JSON directly to disk.  
*Find:* Security defect.  
Step 1: Ticket claims “store user preferences.”  
Step 2: No sanitisation of keys; an attacker can supply `{"../etc/passwd": "..."}`.  
Step 3: Violates checklist item “untrusted input must be validated before filesystem use.”  
Step 4: No test exercises the malicious path.  
**Final answer:** Request changes; require both validation and a negative test.  
*Reflection:* The defect is invisible until the reviewer deliberately supplies adversarial input.

**Example 3 — Performance regression**  
*Given:* Replacement of a linear scan with a nested loop over the same data.  
*Find:* Complexity change.  
Step 1: Original \(O(n)\), new \(O(n^2)\).  
Step 2: For \(n=10^5\) the new version exceeds the 100 ms SLO.  
Step 3: Checklist item “algorithmic complexity must be stated and justified.”  
**Final answer:** Request changes; ask for either a better algorithm or an explicit performance budget exception.  
*Reflection:* Big-O reasoning must be performed on every non-trivial loop.

**Example 4 — Inconsistent error handling**  
*Given:* Three similar functions; two return `Result<T,E>`, one throws.  
*Find:* API inconsistency.  
Step 1: Ticket does not mention error strategy.  
Step 2: Future callers cannot rely on a uniform contract.  
Step 3: Violates maintainability checklist item “error handling must be uniform within a module.”  
**Final answer:** Request changes; convert the throwing function to `Result`.  
*Reflection:* Consistency across a module is a higher-order property visible only after examining several functions together.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Reviewing style only        | Style is the most visible surface           | Use an automated linter first; reserve human time for logic and design. |
| Accepting “it works on my machine” | Reviewer never executes the change locally | Require a green CI run plus at least one manual reproduction of the new test. |
| Ignoring deleted code       | Deletion diff is smaller and easy to skip   | Read the “-” lines with the same attention as the “+” lines. |
| Postponing security review  | Security feels like someone else’s job      | Mandate a security checklist item on every review template. |
| Over-focusing on micro-optimisations | Premature optimisation bias                 | Require a measured performance problem before accepting complexity-increasing changes. |
| Rubber-stamping large refactors | Trust in author’s reputation                | Split large changes; review each incremental step. |
| Forgetting documentation    | Documentation is not executable             | Treat missing or stale doc comments as a blocking defect. |

## 7. The textbook-precise statement
A code review is a formal inspection process in which a change set \(C\) is accepted into the main branch only after at least one qualified peer has verified that \(C\) satisfies the conjunction of predicates  
\[
\text{Correct}(C) \land \text{Tested}(C) \land \text{Readable}(C) \land \text{Secure}(C) \land \text{Consistent}(C).
\]
(See McConnell, *Code Complete*, 2e, Chapter 21, “Collaborative Construction”; also the Google Engineering Practices documentation on “Code Review Guidelines”, 2023 revision.)

## 8. Visual — diagram or schematic
```text
Author
  │
  │ 1. Create CL / PR
  ▼
Reviewer(s)
  │
  ├── 2. Read intent & ticket
  ├── 3. Static analysis (lint, type check)
  ├── 4. Manual path & data-flow walk-through
  ├── 5. Test adequacy check
  └── 6. Security & performance checklist
  │
  ▼
Decision ──► LGTM / Request Changes / Abandon
  │
  ▼
Merge to main
```

## 9. The memory technique
1. **The hook** — Picture a pilot and co-pilot running through a laminated checklist before takeoff; every item is read aloud and answered before the engines start.
2. **What to overlearn** — The seven-item checklist: Correctness, Tests, Readability, Security, Performance, Consistency, Documentation.
3. **Spaced-repetition schedule** — Review the checklist after 1 day, 3 days, 7 days, 16 days, 35 days by performing one full review of a public open-source pull request each time.
4. **First-principles fallback** — If the mnemonic is forgotten, reconstruct the review from first principles: “What would cause this code to produce the wrong answer, to be unmaintainable, or to be unsafe?”

## 10. What this unlocks
Mastery of code review lets you participate safely in large-scale collaborative development and prepares you for the next layer of engineering practice: designing review processes themselves, writing effective static-analysis rules, and leading blameless post-mortems.

- Refactoring at scale (because every step is reviewed)
- Test-driven development (tests become first-class review artefacts)
- Security engineering (threat modelling appears inside ordinary reviews)
- Technical leadership (review comments become the primary teaching channel)

## 11. Self-check — five questions, no answers
1. A one-line change removes an apparently redundant null check. Which single concrete input would prove the removal is unsafe?
2. A reviewer comments only on variable naming for twenty lines of algorithmic code. What systemic problem does this comment pattern indicate?
3. Given a diff that increases cyclomatic complexity from 4 to 11 inside a single function, list the three checklist items that are now in conflict.
4. A security reviewer demands that every new HTTP handler must be accompanied by an OWASP Top-10 threat model. Is this requirement inside or outside the scope of an ordinary code review?
5. After a review ends with “LGTM”, the author realises a test was never executed locally. Which predicate in the formal statement was never actually verified?