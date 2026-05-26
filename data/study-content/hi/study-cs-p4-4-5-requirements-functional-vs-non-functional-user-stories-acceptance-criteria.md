## 1. The one-sentence answer
**Requirements** define exactly what a software system must deliver, split into **functional requirements** that describe specific behaviours and **non-functional requirements** that describe quality attributes, expressed through **user stories** and verified by **acceptance criteria**.

Functional requirements capture the actions a system performs, such as “allow a user to log in with email and password.” Non-functional requirements capture constraints on those actions, such as “login must complete in under 200 ms even with 10 000 concurrent users.” User stories package both into a single sentence that keeps the end-user perspective visible. Acceptance criteria turn the story into measurable pass/fail conditions so that “done” is unambiguous.

The core insight is that requirements are not wish lists; they are contracts that later become tests, architecture decisions and legal obligations.

> [!NOTE]
> The single most important realisation is that every functional requirement must eventually be paired with at least one non-functional requirement; otherwise the system can satisfy the “what” while failing on speed, security or usability.

## 2. Why this matters — concrete and current
SpaceX uses functional requirements such as “Falcon 9 first-stage booster must perform a controlled landing on a drone ship” and non-functional requirements such as “landing accuracy must be within 10 m CEP under 50 m/s wind.” These statements directly drive the flight software’s guidance loop and the structural load tests.

Google’s Search ranking pipeline records the functional requirement “return the top-10 results for any query in under 0.5 s” together with the non-functional requirement “maintain 99.9 % availability across all data centres.” Both statements are encoded as user stories that feed the continuous-integration pipeline and the site-reliability SLO dashboards.

In semiconductor design at TSMC, the requirement “mask data preparation must process a 5 nm full-chip layout in less than 4 hours” is a non-functional timing constraint that forces the tool chain to adopt distributed computing and specific data formats; missing it delays tape-out by weeks.

The Mars 2020 Perseverance rover team documented the functional requirement “drill and cache a rock sample in a sealed tube” and the non-functional requirement “tube must survive 30 g impact and –130 °C for seven years.” These two statements alone determined the mechanical architecture, material selection and verification campaign.

## 3. Mental prerequisites

| Concept                    | Why you need it here                                      |
|----------------------------|-----------------------------------------------------------|
| Basic set notation         | To express “the system shall produce exactly one output for every valid input” without ambiguity |
| Simple predicate logic     | To write acceptance criteria as “if input satisfies P then output satisfies Q” |
| CRUD operations            | Most functional requirements are create/read/update/delete actions on entities |
| Latency, throughput, availability | These are the most common non-functional dimensions you will quantify |

If any row above is unfamiliar, pause and review that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Distinguish behaviour from quality
A functional requirement answers “what must the system do?” A non-functional requirement answers “how well must it do it?”  
Example: “The login button must appear on the home page” is functional; “every page must load in < 1 s on a 4G connection” is non-functional.  
Formal statement: Let \( F \) be the set of functional requirements and \( N \) the set of non-functional requirements. Then \( F \cap N = \emptyset \) and every system behaviour \( b \) is constrained by at least one element of \( N \).

> [!WARNING]
> Treating a performance target as a functional requirement hides the fact that it applies across many behaviours; later you will be unable to trace which tests actually verify the constraint.

### Step 2 — Capture the stakeholder viewpoint with a user story
A user story follows the template: “As a [role], I want [action] so that [benefit].”  
Example: “As a returning customer, I want to log in with my saved credentials so that I can complete checkout in under 30 seconds.”  
This forces the requirement writer to name both the actor and the value delivered.

### Step 3 — Add acceptance criteria as executable predicates
Acceptance criteria are written as “Given–When–Then” or as bullet lists of verifiable conditions.  
Example: Given the user has a valid saved session, when the checkout page loads, then the “Pay with saved card” button appears within 300 ms.  
Formal statement: An acceptance criterion is a predicate \( AC: I \times S \to \{\text{pass, fail}\} \) where \( I \) is input and \( S \) is system state.

### Step 4 — Classify non-functional requirements into ISO 25010 categories
Performance efficiency, security, maintainability, usability, reliability, compatibility and portability form an orthogonal checklist. Every functional requirement must be examined against each category.

### Step 5 — Trace requirements to tests and architecture
Each user story receives a unique identifier. Acceptance criteria become automated test cases. Non-functional numbers become architecture quality-attribute scenarios (Bass et al.).

### Step 6 — Validate completeness with the “INVEST” criteria
User stories must be Independent, Negotiable, Valuable, Estimable, Small and Testable. If any criterion fails, the story is rewritten before implementation begins.

### Step 7 — Baseline and change-control
Once a requirement set is approved, any modification follows a change-control board process that re-evaluates both functional and non-functional impact.

## 5. Worked examples — har step show karo

**Example 1 — Simple login story**  
*Given:* A web application must allow users to authenticate.  
*Find:* One functional requirement, one non-functional requirement, one user story and two acceptance criteria.  
Step 1: Write functional requirement FR-01: “The system shall verify username and password against the stored credential table.”  
Step 2: Write non-functional requirement NFR-01: “Authentication response time shall not exceed 200 ms at the 95th percentile under 5000 concurrent sessions.”  
Step 3: Combine into story: “As a registered user, I want to log in with email and password so that I can access my dashboard.”  
Step 4: Acceptance criteria: (a) Given correct credentials, when submit is clicked, then dashboard appears; (b) Given incorrect credentials, when submit is clicked, then error message is shown within 200 ms.  
**Final answer**  
FR-01, NFR-01, story US-07, AC-07a, AC-07b.

*Reflection:* The example is simple yet already forces explicit timing measurement; students often forget the percentile clause.

**Example 2 — E-commerce checkout performance**  
*Given:* Peak traffic of 10 000 users per minute.  
*Find:* Non-functional requirement that protects revenue.  
NFR-Checkout: “The payment confirmation page shall render in ≤ 800 ms for 99 % of requests during peak load.”  
**Final answer** NFR-Checkout.

*Reflection:* The percentile and load condition prevent the classic “it works on my machine” trap.

**Example 3 — Safety-critical requirement**  
*Given:* Insulin pump software.  
*Find:* Functional plus non-functional pair.  
FR-Dose: “The system shall deliver exactly the physician-prescribed insulin units.”  
NFR-Safety: “Probability of overdose > 0.1 units shall be < 10^{-6} per delivery.”  
**Final answer** FR-Dose + NFR-Safety.

*Reflection:* Safety numbers turn into formal verification obligations.

**Example 4 — Ambiguous story rewritten**  
Original: “As a user, I want fast search.”  
Rewritten: “As a support engineer, I want to search the ticket database by customer ID so that I can resolve issues during a live call.”  
Acceptance criteria: Given a valid customer ID, when search executes, then results appear in ≤ 150 ms and contain the correct ticket list.  
**Final answer** US-42 with two acceptance criteria.

*Reflection:* Adding role and benefit removed three possible interpretations.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Writing “the system shall be fast” | No measurable number supplied               | Always attach a number, percentile and load  |
| Mixing functional and non-functional in one sentence | Author thinks both aspects together         | Split every sentence into separate FR/NFR IDs |
| Acceptance criteria that cannot be automated | Criteria written in natural language only   | Use Given–When–Then or executable predicates |
| User stories larger than one sprint | Story not split using INVEST                | Apply “small” criterion before estimation    |
| Ignoring non-functional categories  | Only performance and security come to mind  | Run the ISO 25010 checklist on every story   |
| Changing requirements without re-testing NFRs | Change-control board skips quality attributes | Mandate NFR impact analysis on every change  |
| Duplicate stories across teams      | No central requirement repository           | Enforce unique IDs and traceability matrix   |

## 7. The textbook-precise statement
A functional requirement is a statement of the form “the system shall produce output \( o \) whenever input \( i \) satisfies predicate \( P(i) \)” (Sommerville, Software Engineering, 10e, §4.2). A non-functional requirement is a constraint on the system’s quality attributes expressed as a measurable target, for example “response time \( t_r \leq 200 \) ms at the 95th percentile under load \( L \)” (ibid., §4.3). A user story is an informal, stakeholder-centric description that must later be elaborated into both functional and non-functional statements. Acceptance criteria are the set of predicates that collectively decide whether an implementation satisfies a user story. All four artefacts must be placed under version control and change control from the moment they are baselined.

## 8. Visual — diagram or schematic
```
[Stakeholder] --> [User Story] --> [FR] --> [Test Cases]
                       |               |
                       v               v
                  [Acceptance Criteria] --> [NFR] --> [Quality Scenarios]
```
Horizontal arrows show derivation; vertical arrows show orthogonal classification. The single box “Acceptance Criteria” sits at the intersection because it must verify both FR and NFR.

## 9. The memory technique
1. **The hook** — Picture a courtroom: the functional requirement is the witness testimony (“what happened”), the non-functional requirement is the forensic measurement (“how fast, how accurate”), the user story is the witness’s identity, and acceptance criteria are the judge’s checklist that ends the case.
2. **What to overlearn** — The six INVEST letters; the ISO 25010 eight quality categories; the template “As a … I want … so that …”.
3. **Spaced-repetition schedule** — Review the INVEST mnemonic after 1 day, re-draw the traceability diagram after 3 days, write one new story with full NFRs after 7 days, audit an existing project’s requirements after 16 days, and teach the distinction to someone else after 35 days.
4. **First-principles fallback** — If you forget the template, start from the sentence “Who needs what value under which constraint?”; the answer directly yields role, action, benefit and measurable limits.

## 10. What this unlocks
Correct requirements become the single source of truth for architecture, testing, contracts and compliance audits.  
- They feed directly into test-driven development and behaviour-driven development frameworks.  
- They enable architecture trade-off analysis (ATAM).  
- They supply the measurable targets used in site-reliability engineering SLOs.  
- They form the legal baseline in fixed-price software contracts.

## 11. Self-check — five questions, no answers
1. Write one functional and one non-functional requirement for a ride-sharing app’s surge-pricing feature.
2. Convert the following sentence into a user story and two acceptance criteria: “Search must return results quickly even when the database has 50 million records.”
3. A story states “As a user I want the app to be secure.” Which INVEST criterion fails and why?
4. Given the non-functional requirement “99.99 % uptime,” derive the maximum allowable downtime per year and state the corresponding quality-attribute scenario.
5. A requirement change increases the allowed latency from 200 ms to 800 ms. Which downstream artefacts must be re-evaluated?