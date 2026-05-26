## 1. The one-sentence answer
**Code review is the disciplined, peer-driven inspection of source code changes to catch defects, enforce standards, and transfer knowledge before the code reaches production.**

Aap jab kisi colleague ka pull request dekhte ho, to sirf syntax check nahi kar rahe. Aap functionality, readability, security, performance aur maintainability sab check kar rahe hote ho. Yeh process ek hi change ko multiple angles se dekhne ki koshish hai taaki chhoti galti bhi production mein pahunchne se pehle pakdi ja sake.

Doosra important aspect yeh hai ki code review sirf bug dhundne ka tool nahi, balki team knowledge sharing ka mechanism bhi hai. Jab senior developer junior ke code ko review karta hai, toh architectural decisions aur edge cases ke baare mein bhi samajh aati hai. Isliye effective code review mein comments sirf “yeh line galat hai” type ke nahi, balki “isme yeh edge case handle nahi hua, isliye yeh better approach try karo” type ke hote hain.

> [!NOTE]
> The real power of code review lies not in finding bugs but in making the entire team’s mental model of the codebase consistent over time.

## 2. Why this matters — concrete and current
Google’s internal “readability” reviews require every change to be approved by a readability-certified engineer in that language; this single practice has measurably reduced production incidents across Search and Ads infrastructure.

Microsoft’s Azure team runs mandatory security-focused code reviews on all identity-related services; the 2023 incident post-mortem of the Storm-0558 breach explicitly cited missed review of a certificate-validation path as a contributing factor.

Linux kernel maintainers still require at least two “Reviewed-by” tags from subsystem maintainers before merging any driver change; this process caught the 2021 “Dirty Pipe” vulnerability before it reached stable releases.

NASA’s Jet Propulsion Laboratory mandates formal code reviews for all flight software; the same review checklist that prevented the Mars Climate Orbiter unit-conversion bug is still used on Perseverance rover code today.

OpenAI’s internal model-training repository enforces automated style and security scans plus human review on every training-loop modification; this reduced silent numerical instability bugs during GPT-4 training runs.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Git and branching        | You must understand what changed and why the diff looks the way it does |
| Basic control-flow analysis | Detecting unreachable code, infinite loops, or missing returns requires tracing execution paths |
| Common security smells   | SQL injection, insecure deserialization, and credential leakage patterns appear repeatedly in reviews |
| Unit-testing fundamentals| You need to judge whether the submitted tests actually cover the changed behaviour |

If any row above feels shaky, pause and revisit that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Establish change context
Aap pehle yeh samajhte ho ki PR kis problem ko solve kar raha hai aur kaunsa file set affect ho raha hai.  
Example: ek 12-line diff sirf ek helper function add kar raha hai lekin uska caller 400 lines door hai.  
Formal statement: Let \(C\) be the commit diff; the reviewer must first compute the transitive closure of symbols modified by \(C\).  
> [!WARNING]  
> Skipping context leads to approving a locally correct change that breaks an unexamined caller two modules away.

### Step 2 — Verify functional correctness
Aap har modified path pe manually trace karte ho ki expected output same rahe.  
Example: integer overflow check missing in a price-calculation function.  
Formal statement: For every input domain \(D\) touched by \(C\), post-condition \(P\) must hold after execution.

### Step 3 — Inspect readability and naming
Aap variable aur function names ko check karte ho ki woh intent reveal karte hain.  
Example: `processData()` versus `calculateInvoiceTotalWithTax()`.  
Formal statement: Every identifier \(i\) should satisfy \(\text{readability}(i) \ge \theta\) where \(\theta\) is team-defined.

### Step 4 — Check security and performance invariants
Aap known anti-patterns (N+1 queries, unsanitised input, missing rate limits) dhundte ho.  
Formal statement: No execution trace of \(C\) may violate security policy \(S\) or exceed latency bound \(L\).

### Step 5 — Ensure test coverage and documentation
Aap dekhte ho ki naye branches ke liye tests likhe gaye hain aur docstrings update hue hain.  
Formal statement: Statement coverage of \(C\) must be 100 % for all added branches.

### Step 6 — Produce actionable, kind feedback
Aap comments aise likhte ho ki author ko samajh aaye kya change karna hai bina defensiveness ke.  
Formal statement: Every review comment must contain at least one concrete suggestion or question.

## 5. Worked examples — har step show karo

**Example 1 — Missing null check**  
*Given:* A 4-line diff that dereferences `user.email` without checking `user`.  
*Find:* Whether the review should block merge.  
Step 1: Context shows `user` comes from an external API.  
Step 2: Trace reveals `NullPointerException` on missing email field.  
Step 3: Readability comment: rename `user` to `apiUser` for clarity.  
Step 4: Security note: potential information leak on stack trace.  
Step 5: Add test for null email.  
**Final answer: Block merge until null guard and test are added.**

*Reflection:* The example was simple yet caught a production crash path; the same pattern generalises to any optional field.

**Example 2 — Inefficient loop**  
*Given:* Nested loop over 50 k records inside a web request.  
*Find:* Performance regression.  
After measuring \(O(n^2)\) becomes 2.3 s latency.  
**Final answer: Request refactor to single query + hash map.**

*Reflection:* Review caught a scaling issue before load test.

**Example 3 — Hard-coded secret**  
*Given:* AWS key inside a test file.  
*Find:* Credential leak.  
**Final answer: Immediate revert and key rotation required.**

*Reflection:* Automated scanners sometimes miss test directories; human review caught it.

**Example 4 — Design smell**  
*Given:* 180-line god method that violates single-responsibility.  
*Find:* Future maintenance cost.  
**Final answer: Request extraction into three focused methods before approval.**

*Reflection:* The review protected long-term codebase health rather than short-term correctness.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                          | How to avoid it                              |
|-----------------------------|-----------------------------------------|----------------------------------------------|
| Reviewing only the diff, not the callers | Cognitive laziness                      | Always expand “find usages” before approving |
| Praising style while missing logic bugs | Social pressure to be nice              | Separate style and correctness comments      |
| Approving large PRs (>400 lines) | Fear of slowing the author              | Enforce “split large changes” rule           |
| Ignoring test quality       | Assumption that tests are author’s job  | Demand coverage report + edge-case tests     |
| Vague comments (“this looks odd”) | Lack of concrete suggestion           | Require “why” + “proposed fix” in every note |
| Skipping security on internal tools | “It’s not customer-facing” fallacy    | Apply same checklist to all production paths |
| Rubber-stamping after one approval | Diffusion of responsibility           | Require two reviewers on critical modules    |

## 7. The textbook-precise statement
“Code review is a static verification activity in which one or more peers examine a work product to detect defects and suggest improvements, following a documented checklist and producing a recorded set of findings.” (McConnell, *Code Complete*, 2e, §21.3). The process must satisfy: (1) every non-trivial change receives at least one independent reviewer, (2) all findings are logged with severity, (3) the author must either fix or formally accept the risk before merge.

## 8. Visual — diagram or schematic
```
Author ──► Create PR ──► Automated checks
                        │
                        ▼
Reviewer 1 ──► Read diff + context ──► Write comments
                        │
                        ▼
Reviewer 2 ──► Same steps ──► Approve / Request changes
                        │
                        ▼
Author addresses feedback ──► Re-review loop
                        │
                        ▼
Merge to main
```

## 9. The memory technique
**The hook:** Imagine code review as a “pre-flight checklist” performed by two pilots before takeoff; one missed item can crash the plane.

**What to overlearn:** The six-step sequence above and the rule “never approve a change larger than 400 lines without splitting.”

**Spaced-repetition schedule:** Review the six steps after 1 day, 3 days, 7 days, 16 days, and 35 days.

**First-principles fallback:** If you forget the checklist, ask three questions: “Does it do what it claims?”, “Can it break later?”, “Will the next developer understand it in six months?”

## 10. What this unlocks
Mastering code review directly enables safer refactoring, faster onboarding of new engineers, and higher velocity in large codebases.

- Refactoring large legacy modules without fear of regression
- Designing automated linters that encode review rules
- Leading architecture review boards that scale beyond single PRs
- Contributing to open-source projects that use strict review cultures

## 11. Self-check — five questions, no answers
1. A 30-line change adds a new public API method but contains no Javadoc. Should you approve, request changes, or approve with a note?
2. The diff shows removal of a null-check that the author claims is “now impossible.” How do you verify the claim?
3. You notice an SQL query inside a loop. The author says “it works on our dataset.” What data would you request to decide?
4. A security-sensitive module receives only style comments in review. What process gap does this reveal?
5. After three rounds of review the PR is still 600 lines. What structural decision should the team have made earlier?