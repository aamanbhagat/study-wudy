## What it is
Software requirements define what a system must do and the constraints under which it must operate. Functional requirements specify the system's behavior (the *what*), while non-functional requirements describe its quality attributes (the *how well*). User stories are a format for capturing functional requirements from an end-user's perspective, and acceptance criteria are the specific, testable conditions a story must meet to be considered complete.

## Why it matters
In complex systems, ambiguity is the enemy. For rocket guidance software, a functional requirement might be "calculate optimal burn time to achieve target orbit." A critical non-functional requirement would be "complete the calculation within 100 milliseconds with a precision of $10^{-9}$." Failure to meet the latter renders the former useless and results in mission failure. In machine learning, a model's predictive capability is a functional requirement, while its inference latency, memory footprint, and fairness are non-functional requirements that determine its deployability.

## When to study it
You are ready for this topic. The primary prerequisite is logical reasoning and the ability to break down a complex problem into smaller, verifiable parts. No specific coding or advanced math is needed, but a basic understanding of a software development lifecycle (i.e., that software is planned, built, and tested) is helpful.

## How to study it (step by step)
1.  **Internalize the core distinction.** Take a physical object, like a scientific calculator. List five things it *does* (e.g., computes sine, stores a value in memory). These are analogous to functional requirements. Now list five qualities it *has* (e.g., battery lasts 2 years, buttons respond in <50ms, display is readable in bright light). These are analogous to non-functional requirements.
2.  **Master the User Story template.** The template is: "As a `<type of user>`, I want `<some goal>` so that `<some reason>`." Pick a simple application you use daily (e.g., a music streaming app). Write three user stories for it. Example: "As a commuter, I want to download a playlist so that I can listen to music offline on the subway."
3.  **Practice writing Acceptance Criteria.** For each user story you wrote, write at least three acceptance criteria using the "Given-When-Then" format. Example for the download story: "Given I am viewing a playlist, when I tap the 'Download' button, then a download progress indicator appears."
4.  **Connect them.** Realize that a user story primarily captures functional requirements. The non-functional requirements act as constraints on that story. For the download story, a non-functional requirement might be: "Downloading a 10-song playlist over a 4G connection must complete in under 60 seconds."
5.  **Find real-world examples.** Go to a large, well-managed open-source project on GitHub (e.g., VS Code, React). Look at their "Issues" tab. Many issues are framed as user stories or bug reports with clear acceptance criteria (often called "steps to reproduce" or "expected behavior"). Analyze how they are written.

## Key ideas, with intuition
1.  **Functional vs. Non-functional: The Verb vs. The Adverb.** A functional requirement is a verb—it describes an *action* the system must perform. "The system *shall authenticate* the user." A non-functional requirement is an adverb—it describes *how* that action is performed. "The system shall authenticate the user *securely* and *quickly* (in < 200ms)." Without the verb, the adverb is meaningless.

2.  **User Stories Force Empathy.** The template `As a [user], I want [goal] so that [benefit]` is not just boilerplate. It forces the engineer to articulate *who* the work is for, *what* they are trying to accomplish, and *why* it matters to them. This context prevents building features that are technically correct but practically useless. It connects the code to a human purpose.

3.  **Acceptance Criteria (AC) are a Testable Contract.** ACs translate the user story's narrative into a set of pass/fail conditions. They are the bridge between the requirement and the code's verification. The `Given [context], When [action], Then [outcome]` format is powerful because it directly maps to how you would write an automated test. If you can't write a clear AC, the requirement is too vague.

## Worked example
Let's define a requirement for a system that visualizes orbital mechanics simulations for physics students.

**High-level Goal:** A student needs to be able to save their simulation parameters for later use.

1.  **Identify Functional Requirement:** The system must provide a mechanism for users to save the current state of a simulation (e.g., masses, velocities, positions of celestial bodies) to their account.

2.  **Identify Non-Functional Requirements:**
    *   **Performance:** The save operation must complete within 2 seconds.
    *   **Reliability:** The saved state must be durable and retrievable with 100% fidelity. The system must have a 99.99% uptime.
    *   **Security:** A student must only be able to access their own saved simulations.

3.  **Frame as a User Story:**
    *   "As a physics student, I want to save my simulation setup so that I can resume my work later or share it with my instructor."

4.  **Define Acceptance Criteria:**
    *   **AC 1 (Happy Path):** Given I am logged in and have a simulation configured, when I click the "Save" button and enter "Mars-Phobos System" as the name, then a confirmation message "Simulation saved successfully" appears, and the "Mars-Phobos System" appears in my list of saved simulations.
    *   **AC 2 (Edge Case - Empty Name):** Given I am logged in and have a simulation configured, when I click the "Save" button but leave the name field blank, then the "Save" button is disabled and a tooltip "Please enter a name" appears.
    *   **AC 3 (Non-Functional Constraint):** Given I am logged in and have a complex simulation with 50 bodies configured, when I click the "Save" button, then the confirmation message appears in under 2 seconds.

**Reflection:** We started with a vague goal. We broke it into a specific function (what it does) and quality constraints (how well it does it). Then, we reframed the function from a user's perspective (the story) and finally defined the exact, testable conditions for success (the ACs). This progression from abstract to concrete is the core workflow.

## Diagrams
This diagram shows the hierarchy and relationship between the concepts. A project's goal is broken down into large features (Epics), which are then broken into specific, user-focused User Stories. Each story must satisfy both its functional goal and the overarching non-functional requirements (NFRs), and its completion is verified by Acceptance Criteria.

```text
                 +-----------------+
                 |   Project Goal  |
                 | (e.g., Build a |
                 |  Sim Visualizer)|
                 +--------+--------+
                          |
                 +--------v--------+
                 |      Epic       |
                 | (e.g., User    |
                 |  Account Mgmt)  |
                 +--------+--------+
                          |
           +--------------+--------------+
           |                             |
+----------v----------+     +--------------------------+
|     User Story      |----<| Non-Functional Reqs (NFRs)|
| (e.g., Save Sim)    |     | (e.g., Performance,      |
+----------+----------+     |       Security, etc.)    |
           |                +--------------------------+
           |
 +---------v-----------------------------------------+
 |                Acceptance Criteria                |
 | 1. Given..., When..., Then... (Happy Path)        |
 | 2. Given..., When..., Then... (Error case)        |
 | 3. Given..., When..., Then... (Performance check) |
 +---------------------------------------------------+
```

## Memory technique — remember this forever
1.  **Mnemonic/Story:** Think of ordering a custom spacecraft.
    *   **Functional:** "I need it to *reach* Mars." (What it does).
    *   **Non-Functional:** "I need it to reach Mars *in under 7 months* with *99.9% reliability* and *shielded against radiation*." (How well it does it).
    *   **User Story:** "As a *mission commander*, I want *a reliable and fast transport to Mars* so that *my crew arrives safely and on schedule*."
    *   **Acceptance Criteria:** "Given the craft is on the launchpad, when the launch sequence is initiated, then it achieves escape velocity within 10 minutes." This is a single, testable contract for one part of the mission.

2.  **Must Overlearn:**
    *   User Story Template: **As a `<user>`, I want `<goal>` so that `<benefit>`.**
    *   Acceptance Criteria Template: **Given `<context>`, When `<action>`, Then `<outcome>`.**
    *   The distinction: **Functional = VERB (action), Non-functional = ADVERB (quality).**

3.  **Spaced Repetition Schedule:** Review these templates and the mnemonic now. Then again in **1 day**, **3 days**, **7 days**, **16 days**, and **35 days**. Create flashcards with the templates.

4.  **First Principles Pathway:** If you forget everything, start from the absolute beginning: "What problem are we solving for whom?"
    *   The answer to "for whom" is the `<user>`.
    *   The answer to "what problem" is the `<goal>`.
    *   The reason it's a problem is the `<benefit>`. This reconstructs the User Story.
    *   To know if you've solved it, you must define a test. "What would I see on the screen? What state would change?" This reconstructs the Acceptance Criteria.

## Common mistakes
1.  **Writing untestable NFRs.** "The system should be fast/easy-to-use/efficient." This is useless. It must be quantified: "Page loads must be under 500ms on a 10 Mbps connection," or "A new user must be able to complete task X in under 3 minutes without training."
2.  **Confusing the User Story's "User".** A story like "As a developer, I want to refactor the database schema..." is not a user story. It's a technical task. The user must be an actual end-user of the system (e.g., student, instructor, administrator).
3.  **Putting UI details in User Stories.** A story should describe the user's goal, not the implementation. "I want to save my work" is better than "I want a blue 'Save' button in the top right corner." The latter pre-supposes a solution and stifles design.
4.  **Acceptance Criteria that are too broad.** Each AC should test one single thing. Avoid using "and" in your `Then` clause. "Then the user is logged in *and* their profile picture is updated" should be two separate ACs.

## Self-check
1.  Classify each of the following as a functional or non-functional requirement:
    *   The system shall email a receipt to the user after a successful transaction.
    *   All user-facing text shall be internationalized into English, Spanish, and German.
    *   The database connection pool must not exceed 20 concurrent connections.
    *   The application must be able to process 500 API requests per second.
2.  Your task is to add a "search" feature to a rocket parts inventory system. Write a single, well-formed user story for this feature, including at least three acceptance criteria (cover the success case, a "no results found" case, and an invalid input case).
3.  A project manager gives you the following requirement: "The new Mars rover's autonomous navigation system needs to be robust." This is poorly defined. Deconstruct this idea and rewrite it as three distinct, specific, and testable non-functional requirements.