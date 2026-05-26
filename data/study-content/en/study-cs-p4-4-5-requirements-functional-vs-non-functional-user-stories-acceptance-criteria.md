## 1. The one-sentence answer
**Requirements engineering decomposes stakeholder intent into functional requirements that specify observable system behaviors and non-functional requirements that bound quality attributes, expressed through user stories whose completion is verified by acceptance criteria.**

A functional requirement states what the system must do: it produces a specific output or state change when given a particular input under defined conditions. A non-functional requirement states how well the system must perform those behaviors, such as response time, reliability, or security level. These two categories together form the complete contract between the problem and the solution.

User stories provide a lightweight, stakeholder-readable format for capturing functional requirements as “As a [role], I want [action] so that [benefit].” Acceptance criteria then supply the measurable conditions that determine whether an implemented story satisfies both its functional intent and any linked non-functional constraints. The distinction between the two requirement types and the linkage through stories and criteria prevents scope creep while making verification objective.

> [!NOTE]
> The decisive insight is that functional requirements are testable behaviors while non-functional requirements are testable constraints; acceptance criteria are the single artifact that makes both kinds of test possible.

## 2. Why this matters — concrete and current
SpaceX uses explicit functional requirements for engine ignition sequencing and non-functional requirements for vibration tolerance below 5 g during Falcon 9 ascent; the same user stories feed both software verification and hardware qualification tests before each launch.

Google’s search-ranking team maintains user stories such as “As a user, I want results in under 300 ms so that I stay on the page,” with acceptance criteria that simultaneously enforce functional relevance scoring and non-functional latency and throughput Service-Level Objectives measured on production traffic.

The F-35 Joint Strike Fighter program documented more than 20 000 requirements; separation of functional mission modes from non-functional real-time deadlines and cybersecurity levels allowed independent verification teams to certify airworthiness without conflating behavioral correctness with timing or security properties.

In machine-learning platforms such as those at OpenAI, functional requirements define model-output formats while non-functional requirements bound training-cost budgets and inference latency; acceptance criteria written as quantitative thresholds on both accuracy and cost prevent deployment of models that are correct yet economically infeasible.

## 3. Mental prerequisites

| Concept                        | Why you need it here                                                                 |
|--------------------------------|--------------------------------------------------------------------------------------|
| Basic software development lifecycle | Requirements sit at the start of every iteration or phase and drive subsequent design, implementation, and verification activities. |
| Input–output distinction       | Functional requirements describe observable mappings from inputs to outputs; non-functional requirements describe properties of those mappings. |
| Testability                    | Acceptance criteria must be written so that pass/fail can be decided by a finite, repeatable procedure. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Separate observable behavior from quality bounds
A requirement is functional when it can be phrased as “the system shall produce result R whenever condition C holds.” It is non-functional when it constrains a measurable attribute of that behavior, such as time, memory, or probability of failure.  
Example: “The login function returns success or failure” is functional; “The login function returns within 200 ms under 10 000 concurrent users” is non-functional.  
Formally, a functional requirement is a relation \( R \subseteq I \times O \); a non-functional requirement is a predicate \( Q(R) \) on that relation.  
> [!WARNING] Treating a performance target as a functional requirement hides the fact that the same behavior can be delivered at different quality levels.

### Step 2 — Capture functional requirements as user stories
A user story records the functional requirement from the perspective of a stakeholder role without prescribing implementation. Its canonical template is “As a [role], I want [action] so that [benefit].”  
The story remains incomplete until acceptance criteria are attached.  
> [!WARNING] Writing implementation details inside the story converts a requirement into a design decision and loses stakeholder intent.

### Step 3 — Attach acceptance criteria to each story
Acceptance criteria are a finite set of Boolean predicates that must all evaluate to true for the story to be accepted. They may reference both functional outcomes and non-functional thresholds.  
Example: “Given a registered user, when credentials are submitted, then success is returned and elapsed time ≤ 200 ms.”  
> [!WARNING] Omitting non-functional thresholds from acceptance criteria allows functionally correct but unusable implementations to pass review.

### Step 4 — Ensure criteria are verifiable
Each acceptance criterion must be decidable by a deterministic procedure whose inputs and expected outputs are fully specified.  
This converts the requirement into an executable test.  
> [!WARNING] Vague criteria such as “the system feels fast” cannot be evaluated consistently across reviewers.

### Step 5 — Trace stories to higher-level goals and lower-level tests
Every user story is linked upward to a business objective and downward to one or more test cases derived directly from its acceptance criteria.  
Traceability matrices record these links.  
> [!WARNING] Missing upward links allows stories that satisfy local criteria yet fail to advance the original mission.

### Step 6 — Baseline and control change
Once reviewed and approved, the set of stories and their acceptance criteria becomes the agreed baseline. Subsequent changes require impact analysis on both functional relations and non-functional predicates.  
This is the textbook statement of controlled requirements management.

## 5. Worked examples — every step shown

**Example 1 — Simple login**  
*Given:* A web application must allow users to authenticate.  
*Find:* One functional requirement expressed as a user story plus acceptance criteria that also enforce a non-functional latency bound.  
Step 1: Identify functional behavior → success or failure response.  
*Why:* This isolates the observable mapping.  
Step 2: Write story → “As a registered user, I want to submit credentials so that I gain access to my dashboard.”  
*Why:* Places the requirement in stakeholder language.  
Step 3: Add criteria → “Given valid credentials, when submitted, then dashboard is displayed and response time ≤ 150 ms.”  
*Why:* Supplies both functional and non-functional predicates.  
**“As a registered user, I want to submit credentials so that I gain access to my dashboard” with acceptance criteria “Given valid credentials, when submitted, then dashboard is displayed and response time ≤ 150 ms.”**

*Reflection:* The example is simple; the key was forcing the latency bound into the same criterion set rather than leaving it as a separate list.

**Example 2 — E-commerce checkout**  
*Given:* An online store must process payments.  
*Find:* Requirements covering both success path and non-functional security.  
Step 1: Functional outcome → order recorded and payment confirmed.  
Step 2: Story → “As a customer, I want to pay with a credit card so that my order is fulfilled.”  
Step 3: Criteria → “Given a valid card, when charged, then order status becomes ‘paid’ and TLS 1.3 is used for the transaction.”  
**“As a customer, I want to pay with a credit card so that my order is fulfilled” with acceptance criteria “Given a valid card, when charged, then order status becomes ‘paid’ and TLS 1.3 is used for the transaction.”**

*Reflection:* Security appeared as a non-functional constraint inside the same acceptance criteria, preventing it from being overlooked.

**Example 3 — Real-time sensor processing**  
*Given:* An embedded controller receives 1000 samples per second.  
*Find:* Requirements that separate throughput from deadline.  
Step 1: Functional → each sample processed exactly once.  
Step 2: Story → “As a control engineer, I want every sample processed so that the control loop remains stable.”  
Step 3: Criteria → “Given 1000 samples arrive within 1 s, when processed, then all samples produce outputs and maximum latency per sample is 800 µs.”  
**“As a control engineer, I want every sample processed so that the control loop remains stable” with acceptance criteria “Given 1000 samples arrive within 1 s, when processed, then all samples produce outputs and maximum latency per sample is 800 µs.”**

*Reflection:* The numeric deadline converted an otherwise vague stability goal into a testable predicate.

**Example 4 — Multi-team collaboration platform**  
*Given:* A document system used by distributed teams.  
*Find:* Requirements balancing collaborative editing with regulatory auditability.  
Step 1: Functional → concurrent edits merged without loss.  
Step 2: Story → “As a team member, I want simultaneous edits merged so that no one’s work is overwritten.”  
Step 3: Criteria → “Given two users edit the same paragraph, when both save, then a single merged version is stored, conflict markers are absent, and every change is logged with user ID and timestamp for seven years.”  
**“As a team member, I want simultaneous edits merged so that no one’s work is overwritten” with acceptance criteria “Given two users edit the same paragraph, when both save, then a single merged version is stored, conflict markers are absent, and every change is logged with user ID and timestamp for seven years.”**

*Reflection:* Retention policy (non-functional) was placed inside the same criterion, ensuring audit compliance is verified together with merge correctness.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Writing non-functional items as functional requirements | Performance or security feels like “what the system does” | Ask whether the statement can be true or false independently of speed or probability |
| Embedding design decisions in user stories | Developers jump to solutions they already know      | Force every story to contain only role, action, and benefit |
| Acceptance criteria that are not machine-checkable | Criteria written in natural language without predicates | Require each criterion to name concrete inputs and expected outputs |
| Omitting non-functional thresholds from stories | Separate “performance spec” document created later  | Mandate at least one non-functional predicate per story |
| Treating “user-friendly” as an acceptance criterion | Subjective adjectives cannot be decided             | Replace with measurable proxies such as task-completion time |
| No upward traceability            | Stories written bottom-up without business context  | Require every story to reference a numbered business objective |
| Baseline drift                    | Changes accepted informally without impact analysis | Enforce change-control board review for any modification to acceptance criteria |

## 7. The textbook-precise statement
A requirement is a statement of a system property that must hold for a solution to be acceptable. Functional requirements define the relation \( R \subseteq I \times O \) that maps inputs to outputs. Non-functional requirements define predicates on attributes of that relation (latency, reliability, etc.). A user story is a triple (role, action, benefit) whose completion is decided by a finite set of acceptance criteria, each a Boolean predicate over observable system states. The collection of stories and criteria constitutes the requirements baseline. (IEEE Std 29148-2018, §6.4–6.5.)

## 8. Visual — diagram or schematic
```text
Stakeholder Intent
       │
       ▼
┌──────────────────────┐
│   User Story         │  (role + action + benefit)
│  "As … I want …"     │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Acceptance Criteria  │  (functional + non-functional predicates)
│ 1. …                 │
│ 2. …                 │
└──────────┬───────────┘
           │
           ▼
   Test Cases (executable)
           │
           ▼
   Traceability Matrix
```
The diagram shows the single downward flow from intent through story and criteria to verifiable tests, with an explicit upward link via the traceability matrix.

## 9. The memory technique
1. **The hook** — Picture a courtroom: the user story is the witness testimony (“what happened”), acceptance criteria are the yes/no questions the jury must answer, and non-functional bounds are the rules of evidence that the answers must also obey.
2. **What to overlearn** — The three-part story template and the rule that every criterion must be a decidable predicate.
3. **Spaced-repetition schedule** — Review distinctions at 1 day, 3 days, 7 days, 16 days, 35 days after first encounter.
4. **First-principles fallback** — Re-derive by asking: “What must be true after the user performs the action?” then “How fast, how reliably, how securely must that truth hold?”

## 10. What this unlocks
Clear requirements are the prerequisite for architecture, test-driven development, and contractual acceptance. The next concepts that depend directly on this material are architectural quality-attribute scenarios, behavior-driven development (BDD) test frameworks, and change-impact analysis during iterative delivery.

## 11. Self-check — five questions, no answers
1. Rewrite the sentence “The system shall be fast” so that it becomes a verifiable non-functional requirement attached to a user story.
2. Given the story “As a pilot, I want to receive terrain alerts so that I avoid mountains,” write two acceptance criteria—one functional, one non-functional—each expressed as a Boolean predicate.
3. Identify whether “All passwords must be hashed with SHA-256 before storage” is a functional or non-functional requirement and justify the classification in one sentence.
4. A story passes all stated acceptance criteria yet users still complain about slow load times. Which trap from Section 6 most likely occurred?
5. Construct a minimal traceability matrix entry that links a business objective numbered OBJ-07, a user story US-014, and three acceptance criteria AC-014-1 through AC-014-3.