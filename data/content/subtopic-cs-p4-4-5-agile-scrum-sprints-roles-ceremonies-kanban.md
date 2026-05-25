## What it is
Agile is a philosophy for iterative project management, prioritizing flexibility and customer feedback over rigid, long-term planning. Scrum and Kanban are two popular frameworks, or specific implementations, of the Agile philosophy; Scrum uses fixed-length iterations called sprints to deliver work, while Kanban uses a continuous flow model focused on visualizing and limiting work in progress.

## Why it matters
These frameworks are the default for modern software development, from startups to large enterprises. In aerospace, companies like SpaceX use Agile principles for rapid prototyping and testing of rocket systems, iterating on designs far faster than traditional "waterfall" approaches. In machine learning, model development is inherently experimental and iterative, making it a perfect fit for Scrum's sprint-based structure to train, evaluate, and deploy models.

## When to study it
Before tackling this, you should have a solid grasp of the entire software development lifecycle (SDLC) from requirements gathering to deployment and maintenance. You should understand the limitations of the traditional "Waterfall" model, where each phase is completed sequentially. Without understanding why Waterfall fails for complex, uncertain projects, the benefits of Agile will seem arbitrary.

## How to study it (step by step)
1.  **Read the Agile Manifesto:** Go to `agilemanifesto.org`. Read the four core values and twelve principles. For each one, write down a one-sentence interpretation of what it means in practice.
2.  **Internalize Scrum Roles:** Create three flashcards: Product Owner ("The What"), Scrum Master ("The How"), and Development Team ("The Doers"). On the back, list their primary responsibilities. The Product Owner maximizes value by managing the product backlog. The Scrum Master facilitates the process and removes impediments. The Dev Team builds the product increment.
3.  **Map the Scrum Cycle:** Draw the Scrum sprint cycle as a feedback loop. Start with Sprint Planning, show the Sprint itself (a 1-4 week box containing Daily Scrums), and end with the Sprint Review and Sprint Retrospective. Label the inputs and outputs of each ceremony.
4.  **Simulate a Kanban Board:** Take a small personal project (e.g., "Complete a problem set for physics"). Create three columns on a piece of paper: To Do, Doing, Done. Write each problem on a sticky note. Physically move the notes across the board, but enforce a strict rule: no more than one or two items in "Doing" at any time. This is your Work-In-Progress (WIP) limit.
5.  **Contrast the two:** Create a two-column table comparing Scrum and Kanban. Use these rows: Cadence (Time-boxed vs. Continuous), Roles (Prescribed vs. Optional), Key Metric (Velocity vs. Cycle Time), Change Philosophy (Discouraged mid-sprint vs. Encouraged anytime).
6.  **Watch a video of a real Daily Scrum (Stand-up):** Search for examples online. Notice how the conversation is structured around the three questions: What did I do yesterday? What will I do today? What impediments are in my way? Note how it is a planning meeting for the next 24 hours, not a status report to a manager.

## Key ideas, with intuition
1.  **Empirical Process Control vs. Defined Process Control:** Traditional "waterfall" engineering is a *defined* process, like assembling a car from a known blueprint. It assumes you know everything upfront. Agile is an *empirical* process, like navigating uncharted territory. It relies on a tight feedback loop of **transparency, inspection, and adaptation**. You take a small step (sprint), check your position (review), and adjust your course (retrospective/planning).

2.  **The Sprint is a Time-Boxed Experiment:** A sprint is not just a deadline; it's a fixed-duration container for running an experiment. The "Sprint Goal" is the hypothesis. The work done during the sprint is the experiment itself. The "Sprint Review" is where you analyze the results (the working software) with stakeholders. This structure forces rapid learning and reduces the risk of building the wrong thing for months on end.

3.  **Work-In-Progress (WIP) as a System Bottleneck:** Kanban's core insight is that multitasking is inefficient. Context switching incurs a high cognitive cost. By strictly limiting the amount of work in the "Doing" column (the WIP limit), you force the team to focus on *finishing* tasks, not just starting them. This is an application of Little's Law from queueing theory: $L = \lambda W$, where $L$ is the average number of items in a system (WIP), $\lambda$ is the average arrival rate (throughput), and $W$ is the average time an item spends in the system (cycle time). To decrease cycle time ($W$) for a given throughput, you *must* decrease WIP ($L$).

4.  **Velocity is a Forecasting Tool, Not a Performance Metric:** In Scrum, "velocity" is the average amount of work (measured in abstract "story points") a team completes per sprint. Its purpose is to answer the question: "Given our past performance, how much work can we plausibly commit to in the next sprint?" It is a measure of a team's capacity, used for future planning. If velocity for the last 3 sprints was 20, 25, 22 points, a reasonable forecast for the next sprint is around 22 points. It is not a target to be maximized; doing so creates perverse incentives to inflate estimates or cut quality.

## Worked example
Let's plan a single 1-week sprint for a project: "Build a basic 2D orbital simulation using Newton's law of gravitation."

**Team:** You (Developer), a Product Owner (PO), and a Scrum Master (SM).
**Product Backlog (a prioritized list of features):**
1.  As a user, I can see a planet and a moon on a 2D canvas. (Estimate: 3 points)
2.  As a user, I can see the moon orbit the planet according to $F = G \frac{m_1 m_2}{r^2}$. (Estimate: 8 points)
3.  As a user, I can adjust the initial velocity of the moon. (Estimate: 5 points)
4.  As a user, I can see a trail showing the moon's path. (Estimate: 2 points)

**Sprint 1 Walkthrough:**

1.  **Sprint Planning (Ceremony 1):**
    *   **Goal:** The PO proposes a Sprint Goal: "Demonstrate a stable, predictable orbit of one body around another."
    *   **Selection:** The team discusses the goal. To achieve it, you need items 1 and 2 from the backlog. The total estimate is $3 + 8 = 11$ points. The team agrees this is achievable in one week. You pull these two items from the Product Backlog into the Sprint Backlog.
    *   **Tasking:** You break down the items into concrete tasks: "Create canvas," "Draw planet sprite," "Implement physics engine," "Write integration loop (Euler method)," "Test for energy conservation."

2.  **The Sprint (1 week):**
    *   **Daily Scrum (Ceremony 2, daily):** Each day, you and the team meet for 15 minutes.
        *   Day 1: "Yesterday I planned the sprint. Today I will create the canvas and draw the static bodies. No impediments."
        *   Day 2: "Yesterday I created the canvas. Today I will implement the core gravitational force calculation. I'm slightly unsure about the vector math, which might slow me down." The SM notes this as a potential impediment and offers to find a good resource.
        *   ...and so on.

3.  **Sprint Review (Ceremony 3):**
    *   At the end of the week, you demonstrate the working software to the PO and any other stakeholders. You show the moon orbiting the planet.
    *   The PO confirms that it meets the acceptance criteria for the completed stories. They provide feedback: "This is great. For the next sprint, let's focus on user interaction by implementing item 3."

4.  **Sprint Retrospective (Ceremony 4):**
    *   After the review, the internal team (you, PO, SM) meets.
    *   You discuss what went well ("The physics implementation was solid"), what could be improved ("I spent half a day debugging a simple vector error; we should have a quick library reference handy"), and an action item for the next sprint ("Bookmark the vector math library documentation").

**Reflection:** Each step is a feedback loop. Planning sets the hypothesis. The daily scrums provide micro-adjustments. The review validates the outcome against the goal. The retrospective improves the process itself for the next iteration.

## Diagrams
A Scrum Cycle Diagram:

```text
+-------------------------------------------------------------------------+
|                                                                         |
|    +-----------------+      +---------------------------------------+   |
|    | Product Backlog |----->| Sprint Planning (Input to Sprint)     |   |
|    +-----------------+      +---------------------------------------+   |
|           ^                               |                             |
|           | (New ideas, feedback)         | (Sprint Backlog)            |
|           |                               v                             |
|    +-----------------+      +---------------------------------------+   |
|    | Sprint Review   |<-----|                                       |   |
|    | (Demo Increment)|      |    SPRINT (1-4 Weeks)                 |   |
|    +-----------------+      |    - Daily Scrum (24h cycle)          |   |
|           |                 |                                       |   |
|           |                 |    (Produces a Potentially            |   |
|           v                 |     Shippable Increment)              |   |
|    +-----------------+      +---------------------------------------+   |
|    | Retrospective   |------------------------------------------------>| (Process Improvement)
|    | (Improve process)|                                                |
|    +-----------------+                                                |
|                                                                         |
+-------------------------------------------------------------------------+
```

A simple Kanban Board:

```text
       To Do (Backlog)      |         Doing (WIP Limit: 2)        |          Done
----------------------------|-------------------------------------|--------------------------
[ ] Story D                 |  [In Progress] Story B              |  [X] Story A
[ ] Story E                 |    - Task B.1                       |
[ ] Story F                 |    - Task B.2                       |
                            |                                     |
                            |  [In Review] Story C                |
                            |    - Task C.1                       |
                            |    - Task C.2                       |
```

## Memory technique — remember this forever
1.  **Mnemonic/Story:**
    *   **Scrum:** Think of a rugby "scrum." A team huddles together (Daily Scrum), pushes forward for a short burst (Sprint), and then resets for the next play (Retrospective/Planning). Remember the **3-5-3 Rule**:
        *   **3 Roles:** Product Owner, Scrum Master, Development Team.
        *   **5 Ceremonies:** Sprint Planning, Daily Scrum, Sprint Review, Sprint Retrospective, and The Sprint itself.
        *   **3 Artifacts:** Product Backlog, Sprint Backlog, Potentially Shippable Increment.
    *   **Kanban:** The word is Japanese for "visual signal" or "signboard." Think of a sushi restaurant where the chef only starts making a new roll when a plate is taken from the conveyor belt. This visual signal "pulls" new work. The core is **Visualize the flow, Limit the WIP.**

2.  **Must Overlearn:**
    *   Scrum is time-boxed and iterative; Kanban is flow-based and continuous.
    *   Agile is a mindset (Manifesto); Scrum/Kanban are frameworks for implementing it.
    *   WIP (Work-In-Progress) Limit: The single most important rule in Kanban for improving flow and reducing cycle time.

3.  **Spaced Repetition Schedule:**
    *   Review the 3-5-3 rule and the core Kanban principle tomorrow (1 day).
    *   Explain the difference between a Sprint Review and a Retrospective to an imaginary colleague (3 days).
    *   Draw the Scrum cycle from memory (7 days).
    *   Redo the Kanban simulation with a new personal project (16 days).
    *   Read one article comparing Scrum, Kanban, and Waterfall (35 days).

4.  **First Principles Pathway:**
    *   If you forget the specific ceremonies, start from the Agile Manifesto's value: "Responding to change over following a plan." How would you design a process to enable change? You'd need to work in small batches to get frequent feedback. This implies iterations (sprints). To get feedback, you need to show your work to stakeholders (sprint review). To get better at the process, you need to reflect on it (retrospective). The rules of Scrum derive logically from this core value.

## Common mistakes
1.  **Treating the Daily Scrum as a Status Report:** The meeting is for the team to coordinate *with each other* for the next 24 hours. It is not for reporting progress to a manager or the Scrum Master.
2.  **Confusing Agile and Scrum:** Saying "We do Agile" when what you mean is "We use the Scrum framework." Agile is the philosophy; Scrum is one specific, and rather prescriptive, implementation. Not all Agile is Scrum.
3.  **Ignoring WIP limits in Kanban:** A Kanban board without WIP limits is just a fancy to-do list. The limits create the "pull" system and are what drive the improvements in flow and cycle time. Ignoring them negates the primary benefit of the framework.
4.  **Inflexible Sprints:** Adding or removing work from a sprint after it has started. This invalidates the forecast made during planning and disrupts the team's focus on the sprint goal. A sprint backlog should be locked once the sprint begins.

## Self-check
1.  A stakeholder asks to add an "urgent" new feature two days into a two-week sprint. As the Scrum Master, how do you respond, and what are the options you present to the Product Owner and the team?
2.  Your team is building a mission-critical flight control system. Would you choose Scrum, Kanban, or a more traditional Waterfall model? Justify your choice by explaining the trade-offs between predictability, flexibility, and risk in this specific context.
3.  A team using Kanban notices that their "Done" column is filling up much faster than their "To Do" column is emptying, but the "Doing" column is always at its WIP limit. What does this indicate about their process, and what is the most likely bottleneck? What single change would you propose to investigate this problem?