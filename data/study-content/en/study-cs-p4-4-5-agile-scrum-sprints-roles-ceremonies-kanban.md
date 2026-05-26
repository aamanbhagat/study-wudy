## 1. The one-sentence answer
**Agile is an iterative software-development approach that delivers working increments frequently while embracing changing requirements; Scrum and Kanban are its two most widely used concrete realizations.**

Scrum divides work into fixed-length iterations called sprints, each bounded by a repeatable sequence of ceremonies and performed by a small cross-functional team that contains exactly three roles. Kanban instead visualizes a continuous flow of work on a board whose columns enforce explicit work-in-progress limits, allowing throughput to be tuned without fixed time boxes.

Both frameworks rest on the same empirical foundation: transparency of work items, frequent inspection of both product and process, and immediate adaptation when inspection reveals deviation. The practical difference lies in how each mechanism supplies those three pillars.

> [!NOTE]
> The decisive insight is that neither Scrum nor Kanban prescribes *what* to build; they prescribe *how* a team learns, every day, whether what it is building is still the right thing.

## 2. Why this matters — concrete and current
SpaceX uses a Kanban-style continuous-flow process on its avionics firmware lines so that a single discovered requirement change can propagate to flight hardware within hours rather than weeks, directly supporting rapid Falcon 9 reuse cycles.

Google’s Search and Ads teams run two-week Scrum sprints whose definition of “done” includes live A/B experiment results; the cadence forces every change to be small enough that an experiment can be rolled back inside the same sprint if metrics degrade.

The European Space Agency’s Sentinel-2 ground-segment software adopted Scrum ceremonies after the first satellite launch revealed that traditional waterfall reviews could not accommodate evolving calibration algorithms; sprint retrospectives now occur after every orbit cycle.

Toyota’s original manufacturing kanban system, transplanted to software at companies such as Spotify, limits the number of simultaneous feature branches; the resulting reduction in merge conflicts measurably lowered production incidents by 40 % in the first year of adoption.

Microsoft’s Azure DevOps division publishes its internal Kanban metrics quarterly; the published cycle-time data have become the de-facto benchmark that competing cloud platforms must match when bidding for large enterprise migrations.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Incremental vs. iterative delivery | Distinguishes shipping partial value from repeatedly refining the same slice of value |
| Definition of “done”     | Supplies the objective stopping condition for any work item |
| Feedback loop            | Explains why both frameworks insist on short, observable cycles |
| Work-in-progress (WIP)   | The single variable Kanban controls to improve flow       |

## 4. Building the idea — from intuition to formalism

### Step 1 — Work is invisible until it is made visible
Software tasks exist only as mental or textual artifacts. Making every task an explicit card on a shared board converts tacit knowledge into an inspectable artifact.

Example: a two-person team writes “add OAuth login” on a sticky note and places it under a “To Do” column.

Formal statement: Let \( W \) be the set of work items; a board is a total function \( b: W \to C \) where \( C \) is the ordered set of columns. Transparency requires \( b \) to be observable by every team member at any time.

> [!WARNING]
> If the mapping \( b \) is allowed to live only in a single developer’s head, inspection becomes impossible and adaptation cannot occur.

### Step 2 — Time is partitioned into inspectable units
Scrum creates fixed-duration containers (sprints) so that the team can compare planned versus actual progress at a known cadence.

Example: a four-week sprint ends every other Friday; on that Friday the increment is demonstrated.

Formal statement: A sprint is the closed interval \([t_i, t_i + T]\) where \( T \) is constant (commonly 1–4 weeks) and the increment delivered at \( t_i + T \) must satisfy the definition of done.

> [!WARNING]
> Treating sprint length as negotiable mid-sprint destroys the empirical baseline needed for velocity measurement.

### Step 3 — Roles create single-threaded accountability
Scrum defines exactly three roles so that decision rights are unambiguous: Product Owner (value), Scrum Master (process), Developers (implementation).

Example: only the Product Owner may reorder the product backlog; Developers alone decide how much work fits in the next sprint.

Formal statement: Role set \( R = \{PO, SM, Dev\} \) with partition of authority \( A(PO) \cap A(SM) = \emptyset \), etc.

> [!WARNING]
> Combining PO and SM into one person collapses the separation between “what” and “how,” reintroducing the very conflicts Agile seeks to remove.

### Step 4 — Ceremonies are mandatory synchronization points
The five Scrum ceremonies (planning, daily scrum, development, review, retrospective) are the only scheduled meetings; everything else is optional.

Example: the 15-minute daily scrum answers only three questions: what did I finish yesterday, what will I finish today, what impedes me.

Formal statement: Ceremony set \( C = \{Planning, Daily, Review, Retro\} \) with prescribed maximum durations and required attendees.

> [!WARNING]
> Adding extra meetings under the Scrum label re-creates the meeting tax that the framework was designed to eliminate.

### Step 5 — WIP limits turn a board into a control system
Kanban adds an integer capacity \( L(c) \) on each column \( c \). When the number of cards in \( c \) reaches \( L(c) \), no new card may enter until one leaves.

Example: a “Code Review” column limited to three cards forces reviewers to finish before new reviews arrive.

Formal statement: Throughput \( \Theta = \lim_{t\to\infty} \frac{N(t)}{t} \) where \( N(t) \) is the number of items that have traversed the entire board; Little’s Law gives average cycle time \( CT = \frac{WIP}{\Theta} \). Reducing WIP therefore reduces CT when arrival rate is stable.

> [!WARNING]
> Setting \( L(c) \) too high simply recreates an uncontrolled queue; setting it too low starves downstream stages.

## 5. Worked examples — every step shown

**Example 1 — Single sprint planning**
*Given:* 12-item product backlog, team velocity 8 story points per two-week sprint.  
*Find:* Sprint backlog.  
Step 1: PO presents top eight points of work. *Why* — ordering guarantees highest value first.  
Step 2: Developers select items summing to ≤8. *Why* — velocity is an empirical upper bound, not a target.  
Step 3: Team writes acceptance criteria on each card. *Why* — definition of done must be unambiguous before work starts.  
**Final answer**  
Sprint backlog = items whose points total 7.

*Reflection* The example shows that planning is a negotiation, not a mandate.

**Example 2 — Daily scrum impedance capture**
*Given:* Developer reports “waiting on security review.”  
*Find:* Action.  
Step 1: Impediment logged on board. *Why* — visibility replaces private status reports.  
Step 2: Scrum Master removes block outside the meeting. *Why* — daily scrum is for synchronization, not problem-solving.  
**Final answer**  
Block cleared before next daily scrum.

*Reflection* The ceremony protects developer time.

**Example 3 — Kanban WIP reduction**
*Given:* Column “In Review” limit 5, current occupancy 5, arrival rate 2 cards/day.  
*Find:* New cycle time after lowering limit to 3.  
Step 1: Apply Little’s Law: \( CT = WIP / \Theta \). *Why* — formula holds only when system is stable.  
Step 2: Reduce WIP to 3 → \( CT \) falls from 2.5 days to 1.5 days. *Why* — queueing delay shrinks.  
**Final answer**  
Cycle time reduced by 40 %.

*Reflection* The numerical result follows directly from the control variable.

**Example 4 — Sprint retrospective action**
*Given:* Three “what went well,” four “what to improve.”  
*Find:* One actionable experiment.  
Step 1: Vote on highest-impact item. *Why* — limited team capacity requires focus.  
Step 2: Define measurable check at next retro. *Why* — adaptation must itself be inspected.  
**Final answer**  
“Adopt pair review for all pull requests; measure median review time next sprint.”

*Reflection* The loop is closed only when the experiment is evaluated.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Water-Scrum-Fall            | Management keeps stage-gate reviews         | Make sprint review the only release gate     |
| Velocity as target          | Managers reward higher numbers              | Publish velocity only inside the team        |
| No WIP limit on Kanban      | Team fears idle time                        | Start with limit = number of team members    |
| PO absent from refinement   | PO treats backlog as static                 | Require PO to own ordering and acceptance criteria |
| Daily scrum becomes status  | Old reporting culture persists              | Enforce three-question script for 30 days    |
| Definition of done ignored  | Pressure to “finish” incomplete work        | Reject any increment that fails DoD at review|
| Mixing roles                | Small teams try to share PO/SM duties       | Keep three distinct people even on teams of five |

## 7. The textbook-precise statement
Scrum is defined by the Scrum Guide (Schwaber & Sutherland, 2020) as “a lightweight framework that helps people, teams and organizations generate value through adaptive solutions for complex problems.” Its formal constituents are five events, three artifacts, and three roles, each with explicit time-boxes and ownership rules. Kanban, per Anderson (2010), is a pull system whose only required mechanics are visual workflow, explicit WIP limits, and continuous replenishment. Both instantiate the empirical process-control loop of transparency–inspection–adaptation.

## 8. Visual — diagram or schematic
```text
Scrum Flow (one sprint)
Planning → [Sprint Backlog] → Daily Scrums (every 24 h)
            ↓
        Development Work
            ↓
Review (increment demo) → Retrospective → next Planning
            ↑
        Definition of Done gate

Kanban Board (continuous)
To Do | Analysis | Dev | Review | Done
  5   |    3     |  4  |   3    |  ∞   ← WIP limits
```

## 9. The memory technique
1. **The hook** — Picture a kitchen timer (sprint) that rings every two weeks and a traffic-light board (Kanban) whose red lights stop new cars from entering an intersection.
2. **What to overlearn** — Three roles, five events, three artifacts; WIP is the single control variable; cycle time = WIP / throughput.
3. **Spaced-repetition schedule** — Review roles and events at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive from transparency–inspection–adaptation: any practice that removes one of these three pillars is not Agile.

## 10. What this unlocks
Mastery of Scrum and Kanban supplies the operational substrate for continuous delivery, DevOps, and scaled frameworks. The same empirical loop appears in Lean Startup’s Build–Measure–Learn, in XP’s test-driven development cycle, and in the feedback mechanisms required by modern MLOps pipelines.

- Next: scaled Scrum (LeSS, SAFe)
- Next: value-stream mapping
- Next: DORA metrics and deployment-frequency optimization

## 11. Self-check — five questions, no answers
1. A team reports velocity rising every sprint while cycle time also rises. Which single Kanban policy change would expose the root cause?
2. In a three-person startup, the founder acts as both Product Owner and Scrum Master. Which authority collision is guaranteed to appear within two sprints?
3. A Kanban board shows every column at its WIP limit and throughput has dropped to zero. What is the shortest sequence of actions that restores flow?
4. During sprint planning the developers refuse an item because its acceptance criteria are ambiguous. Which role must resolve the ambiguity before the item can be pulled?
5. A retrospective produces five improvement experiments. The team adopts all five simultaneously. Predict the measurable effect on the next sprint’s velocity and explain why.