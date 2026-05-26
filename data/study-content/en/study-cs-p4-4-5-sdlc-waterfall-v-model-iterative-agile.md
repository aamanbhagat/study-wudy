## 1. The one-sentence answer
**SDLC models are explicit process templates that sequence the activities of requirements, design, construction, and verification while defining where and how feedback is permitted.**

Waterfall treats the sequence as strictly one-directional: each phase must complete and freeze its outputs before the next begins. V-model adds a symmetric verification branch that pairs every design artefact with a corresponding test level. Iterative and Agile replace the single pass with repeated cycles whose scope and duration are deliberately limited so that requirements and design may evolve.

The practical distinction therefore lies not in the activities themselves but in the permitted direction and timing of information flow between them.

> [!NOTE]
> The decisive insight is that every SDLC model is a contract about when change is still cheap; Waterfall postpones change until after delivery, while Agile forces change to be absorbed inside every short cycle.

## 2. Why this matters — concrete and current
NASA’s flight-software groups still apply a tailored Waterfall variant for the core avionics of the Artemis program because a single missed requirement discovered after hardware fabrication costs tens of millions of dollars.

Google’s internal “Search” and “Ads” teams run two-week Agile sprints; the same organisation simultaneously uses a contractually mandated V-model for the Android certification suite that must satisfy regulatory safety arguments.

The Mars 2020 Perseverance rover software followed an iterative risk-driven process in which each 18-month development cycle ended with an independent verification & validation review; the same codebase later switched to a maintenance Agile cadence once the vehicle was on the surface.

Semiconductor design houses such as TSMC and Intel employ a hybrid V-model for their electronic-design-automation tool chains because every RTL artefact must be formally traced to a verification plan that itself is reviewed by external auditors.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Requirements             | All models begin by deciding how completely requirements must be known before construction starts |
| Verification vs. validation | V-model is defined by the explicit pairing of these two concerns |
| Feedback loop            | Iterative and Agile models are nothing more than controlled feedback loops of bounded length |
| Phase gate               | Waterfall’s rigidity is expressed through formal phase-exit criteria |

## 4. Building the idea — from intuition to formalism

### Step 1 — Linear sequencing
A project can be viewed as a chain of dependent tasks whose outputs become inputs to the next task.  
Example: a four-person student team writes a specification, then hands it to two coders, then to a tester.  
Formally, the precedence relation is a total order:  
\[
R \prec D \prec C \prec V
\]  
where each arrow denotes “must finish before”.  
> [!WARNING] Treating the order as total when a requirement is genuinely uncertain produces an irreversible cascade of rework.

### Step 2 — Symmetric verification pairing
Every constructive artefact can be associated with a unique verification artefact that checks it.  
Example: the design document is checked by integration tests, the code by unit tests.  
The mapping is expressed as a function  
\[
v : \text{Construct} \to \text{Verify}
\]  
that is bijective on the set of artefacts.  
> [!WARNING] Omitting the pairing allows verification to drift from the original design intent.

### Step 3 — Bounded iteration
When uncertainty remains high, the entire sequence is repeated inside a time box whose length is fixed in advance.  
Example: a two-week sprint produces a demonstrable increment.  
The iteration count \(n\) and cycle length \(T\) become explicit parameters:  
\[
\text{Project} = \bigcup_{i=1}^{n} \text{Cycle}_i(T)
\]  
> [!WARNING] Allowing \(T\) to grow without bound reintroduces the late-discovery problem of Waterfall.

### Step 4 — Continuous re-prioritisation
Inside each cycle the set of requirements is allowed to change subject to an explicit change-control rule.  
The rule is usually expressed as a backlog ordered by business value and risk.  
> [!WARNING] Removing the change-control rule turns “Agile” into unstructured hacking.

### Step 5 — Textbook taxonomy
The four canonical models are therefore distinguished solely by the permitted feedback topology: acyclic total order (Waterfall), acyclic bipartite graph (V-model), cyclic sequence of fixed length (Iterative), and cyclic sequence with dynamic reordering (Agile).

## 5. Worked examples — every step shown

**Example 1 — Static website for a bakery**  
*Given:* five pages, fixed images, no database.  
*Find:* which model minimises overhead.  
Step 1: Write one-page spec → 2 h.  
*Why:* captures all requirements at once.  
Step 2: Implement HTML/CSS → 6 h.  
*Why:* follows directly from the frozen spec.  
Step 3: Manual visual check → 1 h.  
*Why:* verification is trivial and one-time.  
**Final answer: Waterfall is optimal.**

**Example 2 — Embedded glucose-monitor firmware**  
*Given:* regulatory requirement for traceability matrix.  
*Find:* model that satisfies audit.  
Step 1: Requirements → System design.  
*Why:* V-model demands explicit verification plan for each level.  
Step 2: Module design → Unit-test plan.  
*Why:* each arrow in the V is auditable.  
Step 3: Code → Integration-test execution.  
*Why:* closes the verification loop.  
**Final answer: V-model satisfies traceability.**

**Example 3 — Mobile banking MVP**  
*Given:* market requirements change every month.  
*Find:* model that absorbs change.  
Step 1: Two-week sprint 1 delivers login screen.  
*Why:* time box forces early feedback.  
Step 2: Sprint 2 adds transfer; backlog re-ordered.  
*Why:* dynamic prioritisation permitted.  
Step 3: After six sprints, feature set differs 40 % from original.  
*Why:* iteration count and reordering together absorb uncertainty.  
**Final answer: Agile.**

**Example 4 — Compiler for a new DSL**  
*Given:* language semantics uncertain, performance critical.  
*Find:* hybrid schedule.  
Step 1: Waterfall for lexer/parser grammar (frozen after week 4).  
*Why:* grammar changes become exponentially expensive.  
Step 2: Iterative 3-week cycles for optimisation passes.  
*Why:* performance measurements drive reordering of passes.  
Step 3: Final V-model verification against language spec.  
*Why:* regulatory-style audit still required.  
**Final answer: Tailored hybrid.**

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Declaring “we are Agile” while freezing requirements for six months | Management confuses cadence with flexibility | Require explicit backlog reordering at every sprint boundary |
| Using Waterfall phase gates without exit criteria | The model is copied from textbooks without the contractual clause | Write measurable completion conditions for each phase |
| Treating the V-model as “Waterfall plus testing” | The verification arrows are drawn but never staffed | Assign equal headcount to each verification activity |
| Letting iteration length drift from two weeks to eight | Team interprets “short” subjectively | Fix calendar time boxes in the project charter |
| Adding an Agile “layer” on top of an unchanged Waterfall contract | Procurement documents remain sequential | Rewrite the contract milestones to accept incremental deliverables |
| Ignoring risk in iterative planning | Velocity is maximised while technical risk is ignored | Reserve 20 % of each cycle explicitly for risk spikes |
| Assuming any model removes the need for competent engineers | Process is mistaken for competence | Conduct periodic process-independent code and design reviews |

## 7. The textbook-precise statement
An SDLC model is a tuple \((P, \prec, F)\) where \(P\) is the set of process phases, \(\prec\) is a partial order on \(P\) expressing permitted sequencing, and \(F\) is the feedback relation that may add edges against \(\prec\). Waterfall requires \(\prec\) to be total and \(F = \emptyset\); V-model augments the order with a matching verification function; Iterative admits a cyclic \(F\) of fixed period; Agile further permits dynamic reordering of elements inside each period. (Sommerville, *Software Engineering*, 10e, §2.1–2.3.)

## 8. Visual — diagram or schematic
```text
Waterfall          V-model               Iterative/Agile
R ──► D ──► C ──► V   R ──► D             ┌──────────────┐
      │       ▲         │    │            │  Cycle 1 (T) │
      │       │         │    ▼            │  backlog────►│
      └───────┘       V ◄── C             └──────┬───────┘
                        ▲    │                   │
                        │    ▼                   ▼
                      Test  Code             Cycle 2 (T)
```
Horizontal arrows show construction flow; vertical arrows show verification pairing; loops indicate bounded iteration.

## 9. The memory technique
1. **The hook** — Picture a river (Waterfall) that suddenly grows verification wings (V), then starts looping back on itself like a spring (Iterative), and finally learns to reorder its own stepping stones every few metres (Agile).  
2. **What to overlearn** — The four feedback topologies: acyclic total, acyclic bipartite, fixed-period cyclic, dynamic cyclic.  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive the model from the single question “When is the latest moment we can still change a requirement without paying more than 10 % extra?”

## 10. What this unlocks
Mastery of these models lets you select and tailor a process for any project instead of defaulting to the last one you used. It directly precedes risk-management techniques, earned-value tracking, and the quantitative management practices found in CMMI level 3 and above.

- Next: Risk-driven spiral model and incremental funding methods  
- Next: Contractual implications of milestone definitions  
- Next: Metrics for measuring process cycle time and escaped defects

## 11. Self-check — five questions, no answers
1. A safety-critical pacemaker project has 400 requirements that must be traced to test cases for regulatory approval. Which single model supplies the required traceability structure with least additional overhead?  
2. A start-up must ship a consumer mobile game whose core gameplay may be completely redesigned after the first 10 000 downloads. Write the shortest schedule description that still guarantees early market feedback.  
3. In a six-month compiler project the lexer grammar is known to be stable after week 3, yet code-generation heuristics will require repeated measurement and tuning. Construct a two-model hybrid schedule and state the exact phase boundary.  
4. A team claims to be “doing Agile” yet has not altered its backlog in four consecutive two-week iterations. Identify the violated feedback rule and the observable symptom that would appear in the next release.  
5. Given only the partial order \(R \prec D \prec C\) and an empty feedback relation, prove that any requirement discovered after the start of construction forces a restart of the entire chain.