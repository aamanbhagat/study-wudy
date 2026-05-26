## 1. The one-sentence answer
**Agile is an iterative software development approach that delivers working increments frequently while embracing changing requirements; Scrum organises this into fixed-length sprints with defined roles and ceremonies, whereas Kanban visualises workflow and limits work-in-progress for continuous flow.**

Agile emerged because traditional sequential models could not cope with rapidly shifting customer needs in real software projects. Instead of planning everything upfront, teams deliver small, usable pieces of software every few weeks, gather feedback, and adjust the plan. Scrum adds structure through time-boxed sprints and specific meetings so that coordination remains predictable even when requirements evolve. Kanban removes fixed time boxes and focuses on visualising every task on a board while enforcing limits on how many items can be active at once, thereby exposing bottlenecks immediately.

> [!NOTE]
> The core insight is that both Scrum and Kanban are not processes to follow blindly; they are feedback systems that make problems visible so the team can improve how it works.

## 2. Why this matters — concrete and current
SpaceX uses a Kanban-style continuous flow for avionics software updates so that flight hardware and ground software stay synchronised across rapid Falcon 9 launch cadences. Google’s Android team runs two-week Scrum sprints for each major release train, allowing thousands of engineers to coordinate feature branches without blocking the mainline. The Mars 2020 Perseverance rover flight software was developed under a Scrum framework with four-week sprints; daily stand-ups surfaced integration issues between navigation and science instruments weeks earlier than waterfall reviews would have allowed. Amazon’s retail platform teams combine Scrum ceremonies for quarterly planning with Kanban boards inside each microservice squad to keep deployment pipelines under strict WIP limits, achieving thousands of deployments per day. Microsoft’s Azure DevOps division publishes public case studies showing how moving from ad-hoc work to explicit Kanban WIP limits reduced cycle time for new service features by 60 % within two quarters.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Iterative development    | Both Scrum and Kanban rely on repeated short cycles instead of one long phase. |
| Work-in-progress (WIP)   | Kanban’s central control mechanism; understanding queueing theory helps. |
| Feedback loops           | Sprint reviews and Kanban metrics exist only to create fast feedback. |
| Cross-functional teams   | Scrum roles assume every sprint can produce a usable increment without external hand-offs. |

If any row is unfamiliar, pause and review basic software process models first.

## 4. Building the idea — from intuition to formalism

### Step 1 — From sequential risk to iterative risk reduction
Traditional waterfall concentrates integration risk at the end of a long timeline. Agile spreads that risk by forcing a working increment every sprint or every few completed items.  
Example: a two-week prototype that lets users log in is delivered instead of a six-month requirements document.  
Formal statement: an increment \(I_t\) must satisfy \(I_t \supseteq I_{t-1}\) and pass all acceptance tests defined at the start of the cycle.  
> [!WARNING] If you treat the increment as “almost done” rather than shippable, the entire risk-reduction benefit disappears.

### Step 2 — Introducing fixed-length containers (sprints)
Scrum places work inside a time-box called a sprint whose length is constant (commonly two weeks). The fixed length creates a regular cadence for planning, inspection, and adaptation.  
Formal: sprint length \(S\) is invariant; velocity \(V\) is measured in story points completed per sprint.

### Step 3 — Defining three accountability roles
Product Owner maximises value of the product backlog; Scrum Master removes impediments and coaches the process; Development Team delivers the increment. These roles are mutually exclusive and collectively exhaustive inside the Scrum team.  
Example: a developer cannot also be Product Owner for the same product.

### Step 4 — The four formal ceremonies
Sprint Planning produces the sprint backlog; Daily Scrum synchronises progress (15 min); Sprint Review inspects the increment with stakeholders; Sprint Retrospective inspects the process itself. Each ceremony has a strict time-box.

### Step 5 — Shifting from time-boxes to flow (Kanban)
Kanban removes the sprint container and instead visualises every work item on a board with explicit WIP limits per column. Throughput becomes the primary metric rather than velocity.  
Formal: for each column \(c\), \(WIP_c \leq \text{limit}_c\).

### Step 6 — Pull system and bottleneck visibility
A new item enters a column only when the downstream column has capacity. This creates an automatic pull signal and makes the slowest step visible as a growing queue.

### Step 7 — Combining both approaches
Many teams run Scrum sprints for cadence while using a Kanban board inside each sprint for daily task flow; the hybrid is sometimes called Scrumban.

### Step 8 — Textbook-grade definition
A software process is Agile if it satisfies the four values and twelve principles of the Agile Manifesto and implements either an iterative time-boxed framework (Scrum) or a continuous flow system with WIP constraints (Kanban).

## 5. Worked examples

**Example 1 — Two-week sprint planning**  
*Given:* A product backlog of 30 stories, team velocity 20 points.  
*Find:* Sprint backlog for next sprint.  
Select top items whose story points sum \(\leq 20\). Add only items that meet Definition of Ready.  
*Why:* Keeps commitment realistic and avoids over-planning.  
**Final answer** Sprint backlog = stories summing to 18 points.  
*Reflection:* The example shows how velocity acts as a simple capacity constraint.

**Example 2 — Daily Scrum coordination**  
*Given:* Three developers report yesterday’s work and today’s plan plus one blocker.  
*Find:* Whether the sprint goal is still achievable.  
Update sprint board; Scrum Master records the blocker for immediate follow-up.  
*Why:* 15-minute limit forces focus on coordination, not problem solving.  
**Final answer** Sprint remains on track after blocker is logged.  
*Reflection:* The ceremony surfaces issues early rather than at sprint end.

**Example 3 — Kanban WIP limit breach**  
*Given:* “In Progress” column limit = 3; four tasks already present.  
*Find:* Action required.  
New task cannot start until one finishes; team swarms on the oldest item.  
*Why:* Enforces the pull principle and exposes capacity problems.  
**Final answer** Work stops entering the column.  
*Reflection:* The rule converts an invisible queue into an explicit policy.

**Example 4 — Sprint retrospective action**  
*Given:* Team notes that code reviews take three days on average.  
*Find:* One process change for next sprint.  
Adopt pair programming for complex modules; measure review time again.  
*Why:* Retrospective converts observation into an experiment with a measurable outcome.  
**Final answer** Pair-programming trial for two weeks.  
*Reflection:* Shows how empirical process control actually works.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Treating sprint length as negotiable | Pressure to fit more work                   | Freeze sprint dates; move scope instead      |
| Product Owner absent from planning | Role confusion with traditional manager     | Make PO attendance a non-negotiable ceremony rule |
| Kanban board without WIP limits | Visualisation alone feels sufficient        | Set explicit numeric limits on day one       |
| Daily Scrum becomes status report | Old command-and-control habit               | Enforce the three-question format strictly   |
| Mixing velocity and story points across teams | Different definitions of “point”           | Normalise points inside one team only        |
| Skipping retrospectives     | “We already know what to fix”               | Time-box 45 min every sprint; rotate facilitator |
| Adding extra roles (e.g., “Scrum Manager”) | Desire for familiar hierarchy               | Keep only the three defined Scrum roles      |

## 7. The textbook-precise statement
“Scrum is a lightweight framework within which people can address complex adaptive problems, while productively and creatively delivering products of the highest possible value.” (Schwaber & Sutherland, The Scrum Guide, 2020). A Kanban system is “a pull system that limits work-in-process (WIP) and visualises the flow of work items through a series of states.” (Anderson, Kanban, 2010). Both satisfy the Agile Manifesto values of individuals and interactions, working software, customer collaboration, and responding to change (Beck et al., 2001).

## 8. Visual — diagram or schematic
```
Scrum Board (inside one sprint)
+------------+------------+------------+------------+
| To Do      | In Progress| Review     | Done       |
| (WIP ∞)    | (WIP 3)    | (WIP 2)    | (WIP ∞)    |
+------------+------------+------------+------------+
| Story A    | Story C    | Story D    | Story B    |
| Story E    |            |            |            |
+------------+------------+------------+------------+
```
Columns represent workflow states; numbers in parentheses are WIP limits. Stories move left to right only when capacity exists.

## 9. The memory technique
1. **The hook** — Picture a kitchen with a strict “three pans on the stove” rule (Kanban WIP) and a 30-minute timer that forces you to plate something edible (Scrum sprint).  
2. **What to overlearn** — Three Scrum roles, four ceremonies, and the single Kanban rule “WIP limit per column”.  
3. **Spaced-repetition schedule** — Review roles and ceremonies after 1 day, 3 days, 7 days, 16 days, and 35 days.  
4. **First-principles fallback** — If you forget a ceremony, ask: “Where does the team inspect the product and where does it inspect its process?” The answer reconstructs Review and Retrospective.

## 10. What this unlocks
Mastering Scrum and Kanban lets you move to scaled frameworks (SAFe, LeSS) and metrics-driven improvement (cycle time, lead time, escaped defects).  
- You can now design CI/CD pipelines whose stage limits match Kanban WIP.  
- You can participate in release-train planning that coordinates multiple Scrum teams.  
- You gain the vocabulary to run empirical process experiments in any engineering organisation.

## 11. Self-check — five questions, no answers
1. A team finishes all planned stories on day 7 of a 14-day sprint. What should they do according to Scrum rules?  
2. A Kanban board shows 8 items in a column whose limit is 4. Which single policy is violated and what must happen next?  
3. Which Scrum ceremony directly inspects the Definition of Done?  
4. A developer is simultaneously acting as Scrum Master and Product Owner for the same product. Which Agile value is most directly at risk?  
5. Using only the concepts above, design a minimal board and WIP policy for a three-person team that must release a hot-fix within 48 hours while continuing normal feature work.