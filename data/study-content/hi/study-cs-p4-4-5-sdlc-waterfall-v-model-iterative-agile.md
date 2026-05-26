## 1. The one-sentence answer
**SDLC models are structured frameworks that define how software is planned, built, tested, and delivered, with waterfall being strictly sequential, V-model linking each phase to verification, iterative allowing repeated cycles, and agile emphasising short feedback-driven increments.**

Waterfall treats development as a linear cascade where each phase finishes before the next begins. Aap requirements gather karte ho, phir design, implementation, testing aur deployment karte ho bina peeche mudey. V-model is linear flow ko testing ke saath vertically mirror karta hai, har development step ka corresponding validation step hota hai.

Iterative model ek hi feature set ko multiple passes mein refine karta hai jab tak quality acceptable na ho jaaye. Agile ismein time-boxed sprints aur continuous customer involvement add karta hai. In sab models ka core difference yeh hai ki woh change ko kitni jaldi accommodate karte hain aur risk kab detect hota hai.

> [!NOTE]
> The deepest insight is that no model is universally superior; each simply encodes a different assumption about how stable requirements and feedback loops will be during the project lifetime.

## 2. Why this matters — concrete and current
NASA’s Mars Perseverance rover flight software followed a tailored waterfall process with formal reviews at each gate because requirements were frozen years before launch and any late change risked mission failure.

Google’s Android operating system uses an iterative model inside its platform team; each major release goes through multiple internal cycles before the public beta, allowing performance regressions to be caught early.

Spotify’s squad model is a direct implementation of agile at scale; cross-functional teams release increments every two weeks and measure success through user retention metrics rather than feature completion percentages.

Intel’s chip design verification flow combines V-model principles with hardware description languages; every RTL module has a matching verification plan that is written before the module is coded, reducing costly silicon respins.

Toyota’s production software for engine control units blends iterative and agile practices; calibration teams run weekly sprints to tune parameters against real-vehicle telemetry collected from test fleets.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Requirements traceability | Every SDLC model maps requirements to later artefacts; without traceability you cannot verify coverage. |
| Phase vs activity distinction | Models differ in whether they allow activities to overlap or must be strictly sequential. |
| Feedback loop latency | The central variable that separates waterfall (long latency) from agile (short latency). |
| Risk exposure over time | Iterative and agile models front-load risk discovery; waterfall defers it. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Linear sequencing creates irreversible commitments
Aap ek phase complete karne ke baad hi agla shuru karte ho. Agar requirements galat nikle to pura downstream work waste ho jaata hai.  
Concrete example: ek banking app ke liye “transfer limit” requirement change hone par testing aur deployment dono redo karne padte hain.  
Formal statement: Let phases be \(P_1, P_2, \dots, P_n\) with exit criteria \(E_i\). Transition occurs only when \(E_i\) is satisfied and no return path exists.  
> [!WARNING]  
> Students often assume a hidden feedback arrow exists; in pure waterfall it does not, so any discovered defect forces a project restart or costly change-control board.

### Step 2 — V-model adds verification symmetry
Har development phase ka ek mirror testing phase hota hai. Requirements ka verification acceptance testing hai, design ka verification system testing hai.  
Formal statement: For each phase \(P_i\) there exists a verification activity \(V_i\) such that \(V_i\) checks the artefacts of \(P_i\).  
> [!WARNING]  
> If the verification plan is written after coding, the symmetry collapses and the model reduces to waterfall with extra documents.

### Step 3 — Iteration introduces controlled repetition
Aap ek partial product banate ho, evaluate karte ho, phir refine karte ho. Har cycle ka scope fixed hota hai lekin quality improve hoti hai.  
Formal statement: Let \(I_k\) be the k-th iteration. The exit condition is \(\Delta Q(I_k) < \epsilon\) where \(Q\) is a quality metric and \(\epsilon\) a threshold.  
> [!WARNING]  
> Without a clear stopping rule, teams keep iterating indefinitely and never ship.

### Step 4 — Agile adds time-boxing and customer feedback inside iterations
Sprints are fixed-length (usually two weeks). At the end of each sprint the increment must be potentially shippable and demonstrated to stakeholders.  
Formal statement: Sprint length \(T\) is constant; velocity \(V\) is measured as story points completed per sprint; release plan is updated after every sprint review.  
> [!WARNING]  
> Treating agile as “no documentation” removes the empirical control loop that makes the model work.

### Step 5 — Model selection is a risk-management decision
Choose waterfall or V-model when requirements volatility is low and safety certification is required. Choose iterative or agile when requirements are expected to evolve rapidly or market feedback is critical.

## 5. Worked examples

**Example 1 — Simple waterfall for a static website**  
*Given:* Requirements are frozen; team of three; four-week deadline.  
*Find:* Phase sequence and deliverables.  
Step 1: Requirements document signed off (day 5).  
Step 2: UI design approved (day 12).  
Step 3: HTML/CSS coded and handed to testing (day 22).  
Step 4: UAT and deployment (day 28).  
*Why* each step: exit criteria must be met before resource hand-off.  
**Final answer**  
Waterfall Gantt chart with four sequential bars.

**Example 2 — V-model for an embedded sensor driver**  
*Given:* Safety-critical requirement “measure temperature every 100 ms with ±0.5 °C accuracy”.  
*Find:* Matching verification activities.  
Requirements ↔ Acceptance test cases written first.  
Architecture ↔ Integration test plan.  
Module design ↔ Unit tests.  
*Why*: each verification re-uses the same acceptance criteria defined at the corresponding level.  
**Final answer**  
Traceability matrix linking every requirement to its verification method.

**Example 3 — Iterative model for a mobile game level**  
*Given:* Core loop playable but unbalanced.  
*Find:* Number of iterations needed.  
Iteration 1: add scoring, measure average session length.  
Iteration 2: adjust difficulty curve, re-measure.  
Stop when session length variance < 15 %.  
*Why*: quantitative threshold prevents endless tweaking.  
**Final answer**  
Three iterations until metric stabilised.

**Example 4 — Agile sprint for an e-commerce checkout**  
*Given:* Backlog of 18 story points; team velocity 9 points/sprint.  
*Find:* Release date for MVP.  
Sprint 1 delivers login + cart (9 points).  
Sprint 2 delivers payment stub (9 points).  
*Why*: time-box forces scope negotiation instead of deadline slip.  
**Final answer**  
MVP released after exactly two sprints.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Treating agile as “no planning” | Misreading the Agile Manifesto | Maintain a living product backlog and release roadmap updated every sprint |
| Waterfall with hidden iteration | Fear of formal change control | Explicitly log every discovered defect as a change request with cost impact |
| V-model verification written after code | Schedule pressure | Enforce the rule that test cases are reviewed before implementation begins |
| Endless iterative cycles | Missing exit criteria | Define quantitative quality gates before iteration starts |
| Agile velocity treated as a performance target | Management misuse | Use velocity only for capacity planning, never for individual appraisal |
| Mixing models without defined interfaces | Team confusion | Draw an explicit process diagram showing where one model hands over to another |
| Ignoring non-functional requirements in early phases | Focus only on features | Allocate explicit architecture spikes in every model |

## 7. The textbook-precise statement
A software process model is a simplified description of a software process that presents one view of that process; the waterfall model is a linear sequential model in which progress is seen as flowing steadily downwards through the phases of requirements, design, implementation, verification and maintenance (Sommerville, Software Engineering, 10e, §2.1). The V-model extends the waterfall by associating each development phase with a corresponding testing phase. Iterative development delivers a sequence of increments, each adding functionality, until the system is complete. Agile methods are iterative and incremental, emphasise frequent delivery of working software, and welcome changing requirements (Beck et al., Agile Manifesto, 2001).

## 8. Visual — diagram or schematic
```
Requirements ──► Design ──► Code ──► Test ──► Deploy
     │              │         │        │
     ▼              ▼         ▼        ▼
  Acceptance    System    Integration Unit
   Testing      Testing     Testing   Testing
```
V-model is read left-to-right on top, bottom-up on the verification leg; each vertical arrow represents a verification relationship.

## 9. The memory technique
1. **The hook** — Imagine a river (waterfall) that never flows backwards, a mirror (V-model) standing at the end, a spiral staircase (iterative) that you climb multiple times, and a pinball machine (agile) that bounces every two weeks.
2. **What to overlearn** — Waterfall has no return arrows; V-model pairs each phase with verification; agile sprint length is fixed; iteration exit condition must be quantitative.
3. **Spaced-repetition schedule** — Review the four model names and one distinguishing trait after 1 day, 3 days, 7 days, 16 days and 35 days.
4. **First-principles fallback** — Ask “What is the latency of feedback from code to customer?” The answer immediately tells you which model family is appropriate.

## 10. What this unlocks
Understanding these models lets you participate in process tailoring discussions, write project plans that match risk profiles, and evaluate tooling such as Jira or Azure DevOps configuration.  
- Next topics: software configuration management, risk management matrices, and earned-value tracking all presuppose a chosen SDLC.  
- Later you will map ISO 26262 (automotive) and DO-178C (avionics) certification requirements onto V-model artefacts.

## 11. Self-check — five questions, no answers
1. In a pure waterfall project, a critical requirement is discovered missing after integration testing. Which phase must be revisited and why?
2. Draw the V-model arrows for a project whose top-level requirement is “system shall boot in under 5 seconds.”
3. An agile team’s velocity dropped from 12 to 7 points after three sprints. List two process hypotheses you would test in the next retrospective.
4. Which model would you select for a satellite firmware update that cannot be rolled back after launch, and justify with one risk metric?
5. A company claims to be “agile” yet freezes requirements six months before release. Identify the contradiction and the likely consequence on delivered quality.