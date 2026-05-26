## 1. The one-sentence answer
**Security engineering reduces the probability that an attacker can violate confidentiality, integrity, or availability by eliminating the ten defect classes enumerated in the OWASP Top 10, with input validation serving as the primary gate and the separation of authentication from authorization serving as the primary policy boundary.**

Attackers almost always begin by sending data the program did not expect. When that data reaches an interpreter—SQL engine, shell, template parser, or serializer—without having been reduced to a known safe form, the interpreter executes the attacker’s instructions instead of the developer’s. Input validation is therefore not an optional nicety; it is the single place where untrusted bytes are forced to become trusted values before any further processing occurs.

Authentication answers the question “who are you?” by verifying identity through secrets or tokens. Authorization answers the subsequent question “what may you do?” by checking whether the verified identity is permitted to perform the requested action. Conflating the two produces systems that either grant excessive privilege after a successful login or leak identity information during access-control checks.

> [!NOTE]
> The single highest-leverage improvement in most codebases is to treat every external byte as tainted until an explicit validation function has both accepted it and returned a strongly typed, safe representation; everything else in the OWASP Top 10 becomes easier once this invariant is enforced at the perimeter.

## 2. Why this matters — concrete and current
In 2021 the Apache Log4Shell vulnerability (CVE-2021-44228) allowed unauthenticated attackers to achieve remote code execution on millions of servers simply by placing a JNDI lookup string inside an HTTP header or log message; the defect was an absence of input validation on strings later passed to a message-lookup interpreter.

Equifax’s 2017 breach exposed 147 million people because an unpatched Apache Struts instance accepted attacker-supplied OGNL expressions; again the root cause was missing validation of untrusted input before it reached an expression engine.

Modern Android and iOS enforce mandatory access-control policies that separate the act of proving a user’s identity (authentication via biometrics or password) from the kernel checks that decide whether that user’s process may open a particular file descriptor; the separation prevents a compromised app from escalating to another user’s data even after successful authentication.

Google’s BeyondCorp and Zero Trust architecture treat every request as coming from an untrusted network; every microservice re-validates both identity tokens and fine-grained authorization attributes on each call, eliminating implicit trust after the initial login step.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Taint tracking           | Lets you reason about which variables still carry untrusted data after input arrives |
| Threat modeling          | Supplies the attacker persona and asset list needed to decide which validations matter |
| HTTP request lifecycle   | Defines the exact points where input crosses the trust boundary                    |
| Role-based vs. attribute-based access control | Distinguishes simple identity checks from richer authorization logic |

## 4. Building the idea — from intuition to formalism

### Step 1 — Every external byte is tainted
Untrusted data enters a program through sockets, files, environment variables, or user interfaces. Until a validation routine has inspected and accepted the data, every subsequent operation on it must be considered potentially malicious.

Example: a web server receives the string `'; DROP TABLE users;--` in a query parameter.  
Formal statement: Let \( D \) be the set of all possible byte sequences arriving from an untrusted source; a validation function \( v: D \to T \cup \{\bot\} \) maps each sequence to a safe value in type \( T \) or to rejection \( \bot \).

> [!WARNING]
> Treating a value as safe merely because it “looks like” a number or identifier allows attackers to smuggle control characters inside accepted-looking strings.

### Step 2 — Validation produces a new, safe value
Validation does not merely check; it constructs a fresh object whose type system guarantees safety. The original tainted bytes are discarded.

Example: parsing `"42"` with `Integer.parseInt` yields an `int`; any later arithmetic uses the `int`, never the original string.

Formal statement: After successful validation, all program paths operate exclusively on values of type \( T \), never on the raw input.

### Step 3 — Authentication establishes identity
Authentication binds a principal to a session by verifying a secret or cryptographic proof. It produces an identity token but does not yet decide privileges.

Formal statement: An authentication function \( a: C \to P \cup \{\bot\} \) maps credentials \( C \) to a principal \( P \) or rejection.

### Step 4 — Authorization consults policy against the established identity
Authorization receives both the principal and the requested action, then evaluates an access-control matrix or policy engine.

Formal statement: An authorization predicate \( \text{authz}(P, A) \to \{\text{permit}, \text{deny}\} \) decides whether principal \( P \) may perform action \( A \).

### Step 5 — The OWASP Top 10 enumerates the residual defect classes
Once input validation and the auth/authz split are enforced, the remaining high-impact defects are catalogued by OWASP: broken access control, cryptographic failures, injection, insecure design, security misconfiguration, vulnerable components, identification failures, software integrity failures, logging failures, and server-side request forgery.

## 5. Worked examples — every step shown

**Example 1 — Rejecting SQL injection at the perimeter**  
*Given:* HTTP parameter `id=1' OR '1'='1`.  
*Find:* Safe integer identifier.  
Step 1: Receive raw string \( s = \) `1' OR '1'='1`.  
*Why:* All external data starts tainted.  
Step 2: Attempt `Integer.parseInt(s)`.  
*Why:* The validation function both checks and constructs a new safe value.  
Step 3: Parse fails; return rejection \( \bot \).  
*Why:* No safe integer exists, so the request is terminated before reaching any SQL engine.  
**Final answer:** Request rejected; no SQL is ever built.

*Reflection:* The trick was discarding the original string rather than attempting to sanitize it after the fact.

**Example 2 — Distinguishing login from permission check**  
*Given:* User supplies valid password and later requests `/admin/delete`.  
*Find:* Whether the action is allowed.  
Step 1: Authentication verifies password and issues JWT containing `user_id=42`.  
*Why:* Identity is now established.  
Step 2: Authorization inspects policy: role of `user_id=42` is “customer”.  
*Why:* Authorization uses the already-authenticated principal.  
Step 3: Policy denies “customer” the action “delete” on resource “admin”.  
*Why:* Auth and authz are separate evaluation steps.  
**Final answer:** 403 Forbidden.

*Reflection:* Many systems would have granted access simply because the JWT existed; separating the checks prevents that error.

**Example 3 — Safe handling of file upload names**  
*Given:* Uploaded filename `../../../etc/passwd`.  
*Find:* Safe storage name.  
Step 1: Validate that the name contains only `[A-Za-z0-9_.-]` and is at most 64 characters.  
*Why:* Whitelist validation produces a new safe string.  
Step 2: Prefix the result with a server-chosen directory and a random UUID.  
*Why:* Even a safe name is never used as a raw path component.  
**Final answer:** Stored file path `/var/uploads/UUID-safe-name`.

*Reflection:* The example shows both validation and subsequent safe construction.

**Example 4 — OWASP A01 broken access control**  
*Given:* Attacker changes `user_id=42` to `user_id=43` in a request after login.  
*Find:* Whether direct object reference is prevented.  
Step 1: Authentication confirms the JWT belongs to user 42.  
*Why:* Identity established.  
Step 2: Authorization checks that the requested object owner equals the principal.  
*Why:* Authz performs the ownership test.  
Step 3: Mismatch yields deny.  
**Final answer:** Access denied.

*Reflection:* The vulnerability appears only when authorization logic is omitted after authentication succeeds.

## 6. Common traps and how to avoid them

| Trap                                | Why it happens                                      | How to avoid it                                      |
|-------------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Using string “sanitization” instead of validation | Developers fear breaking existing input             | Always produce a new typed value; discard raw bytes  |
| Checking authentication then skipping authorization | “If they logged in they must be allowed”            | Require an explicit authz call on every privileged action |
| Client-side validation only         | Performance or UX pressure                          | Treat client checks as hints; re-validate on server  |
| Logging sensitive data to aid debugging | Desire for complete audit trails                    | Define a redaction policy before any logging code is written |
| Hard-coding roles inside conditionals | Simplicity for the first few roles                  | Externalize policy to a decision engine early        |
| Accepting file paths from users without canonicalization | Trust in operating-system path rules                | Resolve to absolute path and verify against allow-list |
| Re-using authentication tokens for authorization decisions | Session tokens often contain only identity          | Issue separate, short-lived capability tokens for actions |

## 7. The textbook-precise statement
A software system satisfies the input-validation invariant if every value that originates outside the trust boundary is accepted only by a total function \( v: D \to T \cup \{\bot\} \) that either yields a value whose static type \( T \) precludes unsafe operations or rejects the input. Authentication is the partial function \( a: C \to P \) that maps credentials to principals. Authorization is the predicate \( \text{authz}: P \times A \to \{\text{permit},\text{deny}\} \). The OWASP Top 10 (2021) enumerates the defect classes that remain when these three mechanisms are absent or incorrectly implemented (OWASP Foundation, “OWASP Top Ten Web Application Security Risks,” 2021).

## 8. Visual — diagram or schematic
```text
External Request
      │
      ▼
[Input Validation] ──► reject (⊥)
      │ accept
      ▼
[Authentication] ──► principal P
      │
      ▼
[Authorization] ──► permit | deny
      │
      ▼
Business Logic (only safe typed values)
```

## 9. The memory technique
1. **The hook** — Picture a medieval castle: the drawbridge (validation) only lets approved visitors inside; the guard at the throne room door (authorization) checks whether the visitor’s signed letter (authentication) grants the requested action.
2. **What to overlearn** — (a) Validation always constructs a new safe value; (b) authentication yields identity, authorization yields permission; (c) every external string is tainted until proven otherwise.
3. **Spaced-repetition schedule** — Review the three definitions after 1 day, again after 3 days, 7 days, 16 days, and 35 days.
4. **First-principles fallback** — Re-derive from the single rule “never let raw external bytes reach an interpreter.”

## 10. What this unlocks
Mastery of input validation plus the auth/authz split allows direct study of secure design patterns, cryptographic protocol verification, and runtime enforcement mechanisms such as software fault isolation.

- Next: threat-modeling methodologies (STRIDE, PASTA)
- Next: static and dynamic analysis tools that track taint
- Next: capability-based security and least-privilege microservice architectures

## 11. Self-check — five questions, no answers
1. A web endpoint receives a JWT containing both identity claims and a boolean `is_admin`. Is the boolean part of authentication or authorization?  
2. Write the validation function signature for an endpoint that must accept only ISO-8601 dates after 2020-01-01.  
3. An application logs the raw SQL statement it is about to execute. Which OWASP Top 10 risk is increased and why?  
4. Explain in two sentences why client-side length checks on a file-upload name do not satisfy the input-validation invariant.  
5. Given a request that succeeds after authentication but fails when the same principal requests a different resource, which single predicate must have changed?