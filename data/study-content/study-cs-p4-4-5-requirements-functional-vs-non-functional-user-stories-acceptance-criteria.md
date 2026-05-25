## 1. What it is — in plain English

Imagine you're building a custom treehouse. Before you even touch a hammer or saw, you need to know what kind of treehouse you're making, right? Will it have a slide? A secret trapdoor? How strong does it need to be to hold all your friends? These are your "requirements."

In software, "requirements" are simply what the software needs to do or be. They are the blueprint and the wish list for your digital creation. Just like a builder needs to know if a house needs three bedrooms or two, a software developer needs to know if an app needs to send emails or process payments.

We break these down into two main types: "functional" and "non-functional." Functional requirements are about what the software *does* – like, "the treehouse will have a ladder." Non-functional requirements are about *how well* it does it – like, "the ladder must be sturdy enough for an adult."

To make these requirements easier to understand and build, especially in modern software teams, we often write them as "user stories." These are short, simple descriptions of a feature from the perspective of the person who wants it. For our treehouse, a user story might be: "As a kid, I want a slide so I can get down quickly and have fun!" Finally, "acceptance criteria" are the specific checks that tell us when a user story is truly finished and working correctly. For the slide, it might be: "The slide must be securely attached to the treehouse and reach the ground safely."

## 2. Why it matters — real-world applications

Understanding and meticulously defining requirements is not just good practice; it's absolutely critical for the success, safety, and profitability of any software project. Here are a few real-world applications:

1.  **Aerospace (e.g., SpaceX Starship Development):**
    *   **Functional Requirement:** "The Starship's flight control system *shall* execute a vertical landing maneuver." This defines a core capability.
    *   **Non-Functional Requirement:** "The Starship's thermal protection system *shall* withstand re-entry temperatures of up to $1650^\circ C$ ($3000^\circ F$) for a duration of 5 minutes, maintaining internal temperatures below $50^\circ C$ ($122^\circ F$)." This specifies a critical performance and safety constraint.
    *   **Why it matters:** In aerospace, misinterpreting or missing a requirement can lead to catastrophic failure, loss of life, and billions of dollars in losses. Without precise NFRs for thermal resistance, the vehicle could burn up on re-entry. Without clear FRs for landing, the vehicle wouldn't know *how* to land.

2.  **Machine Learning (e.g., Autonomous Driving Systems like Waymo):**
    *   **Functional Requirement:** "The autonomous vehicle *shall* identify and classify pedestrians, cyclists, and other vehicles in its path." This is about what the perception system *does*.
    *   **Non-Functional Requirement:** "The pedestrian detection system *shall* achieve a recall rate of 99.9% for pedestrians within 50 meters, with a latency of less than 100 milliseconds, under varying weather conditions (rain, fog, clear)." This defines the required accuracy and responsiveness.
    *   **Why it matters:** For self-driving cars, the "how well" (NFRs) is often more critical than the "what" (FRs). A system that *can* detect a pedestrian but *only* with 70% accuracy or *after* a 500ms delay is a severe safety hazard. Clear, measurable NFRs are essential for public safety and regulatory compliance.

3.  **Financial Trading Platforms (e.g., High-Frequency Trading Systems):**
    *   **Functional Requirement:** "The trading system *shall* execute a market buy order for a specified stock and quantity." This is a fundamental transaction.
    *   **Non-Functional Requirement:** "The order execution latency *shall* be less than 10 microseconds (from order submission to exchange acknowledgment) for 99.999% of all trades during peak market hours." This specifies extreme performance.
    *   **Why it matters:** In high-frequency trading, microseconds can mean millions of dollars in profit or loss. A system that "works" (FR met) but is too slow (NFR failed) is completely useless and financially devastating. Security NFRs are also paramount to prevent fraud and hacking.

4.  **Healthcare Information Systems (e.g., Electronic Health Records - EHR):**
    *   **Functional Requirement:** "The EHR system *shall* allow authorized medical staff to view a patient's complete medical history, including diagnoses, medications, and lab results." This is a core data retrieval function.
    *   **Non-Functional Requirement:** "The EHR system *shall* be compliant with HIPAA (Health Insurance Portability and Accountability Act) for patient data privacy and security, encrypting all patient data at rest and in transit." Another NFR: "The system *shall* maintain 99.99% uptime to ensure continuous access to critical patient information."
    *   **Why it matters:** In healthcare, data privacy, security, and availability are life-critical. A system that functions but leaks patient data (HIPAA NFR failed) faces massive fines and legal repercussions. A system that is often down (uptime NFR failed) can prevent doctors from accessing vital information, potentially leading to medical errors.

## 3. Prerequisites — what you must know first

Before diving deep into requirements, ensure you have a foundational understanding of these concepts:

*   **Software Development Lifecycle (SDLC):** The structured process that software projects follow, from conception to retirement. Requirements gathering is an early and crucial phase.
*   **Concept of a "Project":** A temporary endeavor undertaken to create a unique product, service, or result, having a defined beginning and end.
*   **Stakeholders:** Any individual, group, or organization who may affect, be affected by, or perceive itself to be affected by a decision, activity, or outcome of a project.
*   **Basic Communication Skills:** The ability to clearly articulate ideas, listen actively, and ask clarifying questions is paramount for requirements elicitation.
*   **Problem-Solving Mindset:** The capacity to analyze a situation, identify its core components, and formulate solutions.
*   **Testing Fundamentals:** A basic understanding of what software testing entails helps in writing testable requirements.

## 4. The core idea — step by step

Let's break down the concept of requirements, functional vs. non-functional, user stories, and acceptance criteria step by step.

### Step 1: Understanding Requirements

*   **Plain English Statement:** A requirement is simply a statement describing something the software needs to do or a quality it needs to possess to satisfy a user's need or achieve a business objective. It's the "what" and "how well" of the system we're building.
*   **Small Concrete Example:** For an online bookstore, a requirement could be: "The system must allow users to search for books by title."
*   **The Formal/Mathematical Version:** In a general sense, a requirement $R$ can be seen as a mapping from a stakeholder's need $N_S$ to a system capability $C_S$ or constraint $K_S$.
    $$ R: N_S \to \{C_S \lor K_S\} $$
    Where $N_S$ represents a problem or objective for a stakeholder, $C_S$ is a capability the system must provide, and $K_S$ is a constraint the system must adhere to.
*   **What Could Go Wrong:** Without clear requirements, developers might build features nobody wants, or they might completely misunderstand the problem they are supposed to solve, leading to wasted effort and a useless product. It's like building a car without knowing if the customer needs a sedan or a truck.

### Step 2: Functional Requirements (FRs)

*   **Plain English Statement:** Functional requirements describe the *functions* that a system or its components must perform. They define "what" the system *does*. These are often actions or behaviors.
*   **Small Concrete Example:**
    *   "The system *shall* allow users to register for an account."
    *   "The system *shall* display the current weather forecast for a specified city."
    *   "The system *shall* send an email notification when a new order is placed."
*   **The Formal/Mathematical Version:** A functional requirement $FR_i$ specifies a transformation of inputs to outputs, or a change in system state. It can be modeled as a function:
    $$ FR_i: \text{InputState} \times \text{InputEvent} \to \text{OutputState} \times \text{OutputEvent} $$
    Or more simply, a statement of a service the system should provide: "The system *shall* perform action A when condition C is met." They are typically testable by observing system behavior.
*   **What Could Go Wrong:** If functional requirements are missing, the software will be incomplete, lacking essential features that users expect or need. If they are ambiguous, developers might implement features incorrectly, leading to bugs or rework.

### Step 3: Non-Functional Requirements (NFRs)

*   **Plain English Statement:** Non-functional requirements describe *how well* the system performs its functions. They define the quality attributes, constraints, and characteristics of the system, rather than specific behaviors. These are often qualities or adjectives.
*   **Small Concrete Example:**
    *   "The system *shall* load the user dashboard within 2 seconds for 95% of users." (Performance)
    *   "The system *shall* encrypt all user passwords using AES-256 encryption." (Security)
    *   "The system *shall* be available 99.9% of the time." (Availability)
    *   "The system *shall* be compatible with Chrome, Firefox, and Edge browsers." (Compatibility)
*   **The Formal/Mathematical Version:** A non-functional requirement $NFR_j$ defines a measurable quality attribute $Q_j$ that the system must satisfy, often within a specified threshold $T_j$.
    $$ NFR_j: Q_j \le T_j \quad \text{or} \quad Q_j \ge T_j $$
    For example, for performance, $Q_j$ might be response time, and $T_j$ might be 2 seconds. For availability, $Q_j$ might be uptime percentage, and $T_j$ might be 99.9%. NFRs are crucial for user satisfaction and system viability.
*   **What Could Go Wrong:** Neglecting NFRs can lead to a system that technically "works" (all FRs met) but is slow, insecure, difficult to use, or expensive to maintain. Users will abandon a slow, buggy, or insecure application, regardless of its features.

### Step 4: User Stories

*   **Plain English Statement:** A user story is a short, simple description of a feature told from the perspective of the person who desires the new capability, usually a user or customer of the system. It focuses on the value delivered to the user.
*   **Small Concrete Example:**
    *   "As a *registered user*, I want to *reset my password* so that I can *regain access to my account if I forget it*."
    *   "As a *customer*, I want to *view product reviews* so that I can *make an informed purchasing decision*."
*   **The Formal/Mathematical Version:** User stories often follow a standard template:
    $$ \text{As a } \langle \text{type of user} \rangle, \text{ I want to } \langle \text{perform some goal/action} \rangle \text{ so that } \langle \text{I receive some benefit/reason} \rangle. $$
    This structure ensures that the "who," "what," and "why" are clear, promoting empathy for the user and understanding of the business value.
*   **What Could Go Wrong:** User stories can be too vague, too large (called "epics" if they can't be completed in a single development iteration), or fail to articulate a clear benefit. This leads to developers building features without a full understanding of their purpose or scope.

### Step 5: Acceptance Criteria

*   **Plain English Statement:** Acceptance criteria are the conditions that must be met for a user story to be considered complete and working correctly. They are specific, testable statements that define the boundaries of the story and confirm that the feature delivers the intended value.
*   **Small Concrete Example:** For the user story: "As a registered user, I want to reset my password so that I can regain access to my account if I forget it."
    *   **Acceptance Criteria 1:** Given I am on the login page, When I click "Forgot Password", Then I am redirected to the password reset page.
    *   **Acceptance Criteria 2:** Given I am on the password reset page and enter my registered email address, When I click "Send Reset Link", Then an email containing a unique password reset link is sent to my email address.
    *   **Acceptance Criteria 3:** Given I receive the password reset email and click the link, When I am prompted to enter a new password and confirm it, Then my password is updated, and I can log in with the new password.
    *   **Acceptance Criteria 4:** Given I am on the password reset page and enter an unregistered email address, When I click "Send Reset Link", Then I see an error message "Email not found" and no email is sent.
*   **The Formal/Mathematical Version:** Acceptance criteria are often expressed using the Gherkin syntax (Given-When-Then), which is a structured, semi-formal language used for behavior-driven development (BDD). Each criterion $AC_k$ is a logical predicate that evaluates to true or false.
    $$ AC_k: \text{GIVEN } (\text{context } C_1 \land C_2 \land \dots) \land \text{WHEN } (\text{event } E_1 \land E_2 \land \dots) \implies \text{THEN } (\text{outcome } O_1 \land O_2 \land \dots) $$
    These are essentially test cases that define "done."
*   **What Could Go Wrong:** Acceptance criteria that are ambiguous, untestable, or incomplete will lead to features that are either partially implemented, buggy, or don't truly satisfy the user's need. Without clear AC, developers and testers won't know when a feature is truly "done."

## 5. Worked examples — multiple, with every step shown

Here are several worked examples, demonstrating the breakdown of requirements into functional, non-functional, user stories, and acceptance criteria.

### Example 1: E-commerce Product Display (Easy)

**Problem:** A new e-commerce website needs to display product information to potential customers.

**Given:** An e-commerce platform with a database of products.
**We Want:** To allow users to view detailed information about a product.

**Step 1: Identify Functional Requirements (FRs)**
*   **FR 1 (Plain English):** The system shall display the product's name.
    *   **Why it works:** This describes a core action the system must perform – showing a specific piece of data.
*   **FR 2 (Plain English):** The system shall display the product's description.
    *   **Why it works:** Another specific data display action.
*   **FR 3 (Plain English):** The system shall display the product's price.
    *   **Why it works:** Essential information for a purchasing decision.
*   **FR 4 (Plain English):** The system shall display at least one image of the product.
    *   **Why it works:** Visual representation is a key feature for e-commerce.

**Step 2: Identify Non-Functional Requirements (NFRs)**
*   **NFR 1 (Plain English - Performance):** The product page shall load completely within 1.5 seconds for 90% of users.
    *   **Why it works:** This specifies *how well* the page should perform. It's measurable and affects user experience.
*   **NFR 2 (Plain English - Usability):** The product information shall be clearly readable on mobile devices (smartphones and tablets).
    *   **Why it works:** This is a quality attribute related to user experience across different devices.
*   **NFR 3 (Plain English - Security):** All product data transmitted to the user's browser shall be encrypted using HTTPS.
    *   **Why it works:** A constraint on how data is handled, ensuring security.

**Step 3: Draft a User Story**
*   **User Story (Plain English):** As a *shopper*, I want to *see detailed product information* so that I can *make an informed decision about whether to buy the product*.
    *   **Why it works:** It clearly states the role (shopper), the goal (see detailed info), and the value/reason (informed decision).

**Step 4: Define Acceptance Criteria for the User Story**
*   **AC 1 (Plain English):** Given I am on the homepage, When I click on a product link, Then I am navigated to the product detail page.
    *   **Why it works:** This defines the entry point and expected navigation.
*   **AC 2 (Plain English):** Given I am on the product detail page, When the page finishes loading, Then I see the product's name, description, price, and at least one image displayed.
    *   **Why it works:** This directly verifies the functional requirements identified earlier are met.
*   **AC 3 (Plain English):** Given I am on the product detail page, When the page finishes loading, Then the page content is fully visible and interactive within 1.5 seconds.
    *   **Why it works:** This directly verifies the performance NFR.

**Reflection:** This example is straightforward, focusing on basic display functionality. The trickiest part is ensuring the NFRs are measurable and that acceptance criteria cover both FRs and relevant NFRs.

### Example 2: Online Learning Platform Course Enrollment (Medium)

**Problem:** Students need to be able to enroll in courses on an online learning platform.

**Given:** An authenticated student user, a list of available courses.
**We Want:** A student to successfully enroll in a course and have it appear in their "My Courses" list.

**Step 1: Identify Functional Requirements (FRs)**
*   **FR 1 (Plain English):** The system *shall* allow an authenticated student to select a course for enrollment.
*   **FR 2 (Plain English):** The system *shall* process the enrollment request.
*   **FR 3 (Plain English):** The system *shall* add the enrolled course to the student's "My Courses" list.
*   **FR 4 (Plain English):** The system *shall* prevent a student from enrolling in the same course multiple times.

**Step 2: Identify Non-Functional Requirements (NFRs)**
*   **NFR 1 (Plain English - Performance):** The course enrollment process (from click to confirmation) *shall* complete within 3 seconds for 98% of requests.
*   **NFR 2 (Plain English - Scalability):** The system *shall* support 500 concurrent enrollment requests without degradation in performance (i.e., maintaining NFR 1).
*   **NFR 3 (Plain English - Data Integrity):** The system *shall* ensure that enrollment records are consistent across all databases, even in case of system failures.
*   **NFR 4 (Plain English - Usability):** The enrollment confirmation message *shall* be clear and easily understandable.

**Step 3: Draft a User Story**
*   **User Story (Plain English):** As a *student*, I want to *enroll in a course* so that I can *start learning and track my progress*.

**Step 4: Define Acceptance Criteria for the User Story**
*   **AC 1 (Plain English):** Given I am logged in as a student and viewing an available course, When I click the "Enroll" button, Then I see a confirmation message indicating successful enrollment.
    *   **Why it works:** Verifies the basic enrollment action and immediate feedback.
*   **AC 2 (Plain English):** Given I have successfully enrolled in a course, When I navigate to my "My Courses" page, Then the newly enrolled course is listed there.
    *   **Why it works:** Verifies the course is correctly associated with the student.
*   **AC 3 (Plain English):** Given I am already enrolled in a course, When I attempt to enroll in the same course again, Then I receive a message indicating I am already enrolled, and no duplicate enrollment record is created.
    *   **Why it works:** Verifies FR 4 (preventing duplicate enrollments).
*   **AC 4 (Plain English):** Given I click the "Enroll" button, When the enrollment process completes, Then the total time taken is less than 3 seconds.
    *   **Why it works:** Verifies NFR 1 (performance).

**Reflection:** This example introduces more complex business logic (preventing duplicates) and performance/scalability NFRs. The key is to ensure ACs cover both the happy path and relevant edge cases or negative scenarios.

### Example 3: AI-powered Recommendation Engine (Hard)

**Problem:** Develop an AI-powered system to recommend relevant content (e.g., movies, articles) to users based on their past interactions.

**Given:** An authenticated user with a history of interactions (e.g., watched movies, read articles, ratings). A catalog of available content.
**We Want:** The system to provide personalized, relevant content recommendations.

**Step 1: Identify Functional Requirements (FRs)**
*   **FR 1 (Plain English):** The system *shall* generate a list of content recommendations for a logged-in user.
*   **FR 2 (Plain English):** The system *shall* use the user's viewing/reading history and ratings to influence recommendations.
*   **FR 3 (Plain English):** The system *shall* ensure that recommended content has not been previously consumed by the user.
*   **FR 4 (Plain English):** The system *shall* allow users to explicitly "dislike" a recommendation, which should then influence future recommendations.

**Step 2: Identify Non-Functional Requirements (NFRs)**
*   **NFR 1 (Plain English - Performance):** Content recommendations *shall* be generated and displayed within 500 milliseconds of a user accessing the recommendations page.
*   **NFR 2 (Plain English - Accuracy):** The recommendation engine *shall* achieve a precision@10 score of at least 80% (meaning 8 out of 10 recommendations are relevant) for active users.
    *   **Formal:** Precision@k is defined as:
        $$ \text{Precision@k} = \frac{|\{\text{relevant items in top k recommendations}\}|}{k} $$
*   **NFR 3 (Plain English - Freshness/Recency):** Recommendations *shall* be updated to reflect new user activity (e.g., a new rating) within 15 minutes.
*   **NFR 4 (Plain English - Explainability/Transparency):** For any given recommendation, the system *shall* be able to provide a brief explanation of *why* it was recommended (e.g., "Because you watched X and Y").

**Step 3: Draft a User Story**
*   **User Story (Plain English):** As a *user*, I want to *see personalized content recommendations* so that I can *discover new content that aligns with my interests without extensive searching*.

**Step 4: Define Acceptance Criteria for the User Story**
*   **AC 1 (Plain English):** Given I am logged in and have watched at least 5 movies, When I navigate to the recommendations section, Then I see a list of at least 10 movie recommendations.
    *   **Why it works:** Verifies basic recommendation generation and quantity.
*   **AC 2 (Plain English):** Given I have watched movies A, B, and C (all sci-fi), When I view my recommendations, Then at least 70% of the recommendations are sci-fi movies, and none of them are A, B, or C.
    *   **Why it works:** Verifies FR 2 (personalization) and FR 3 (no previously consumed content).
*   **AC 3 (Plain English):** Given I am on the recommendations page, When the page loads, Then the recommendations are displayed within 500 milliseconds.
    *   **Why it works:** Verifies NFR 1 (performance).
*   **AC 4 (Plain English):** Given I "dislike" a recommended movie, When I refresh the recommendations page, Then that movie no longer appears in my recommendations, and similar movies are less likely to be recommended.
    *   **Why it works:** Verifies FR 4 (dislike functionality and its impact).
*   **AC 5 (Plain English):** Given I have just rated a movie, When I check my recommendations 15 minutes later, Then the recommendations list has been updated to reflect the influence of my new rating.
    *   **Why it works:** Verifies NFR 3 (freshness).

**Reflection:** This example highlights the complexity of NFRs for AI systems, particularly accuracy and freshness, which are harder to define and test precisely. The explanation NFR is also a challenge. Acceptance criteria for such systems often involve statistical measures rather than simple true/false checks.

### Example 4: Aerospace Flight Control System (Hard - Safety Critical)

**Problem:** Design a subsystem for an aircraft's flight control system responsible for maintaining altitude.

**Given:** Current altitude, target altitude, vertical velocity, and engine thrust control.
**We Want:** The system to automatically adjust engine thrust to maintain a commanded altitude.

**Step 1: Identify Functional Requirements (FRs)**
*   **FR 1 (Plain English):** The system *shall* receive a target altitude from the pilot or autopilot.
*   **FR 2 (Plain English):** The system *shall* continuously monitor the aircraft's current altitude.
*   **FR 3 (Plain English):** The system *shall* calculate the required engine thrust adjustments to maintain the target altitude.
*   **FR 4 (Plain English):** The system *shall* command the engine thrust control system to apply the calculated thrust adjustments.
*   **FR 5 (Plain English):** The system *shall* alert the pilot if it cannot maintain the target altitude within a specified tolerance.

**Step 2: Identify Non-Functional Requirements (NFRs)**
*   **NFR 1 (Plain English - Real-time Performance):** The altitude control loop (sense, calculate, act) *shall* complete within 20 milliseconds.
    *   **Formal:** Let $T_{loop}$ be the time taken for one full control cycle. Then $T_{loop} \le 20 \text{ ms}$.
*   **NFR 2 (Plain English - Accuracy/Stability):** The system *shall* maintain the aircraft's altitude within $\pm 5$ feet of the target altitude during stable flight conditions.
    *   **Formal:** Let $A_{current}$ be the current altitude and $A_{target}$ be the target altitude. Then $|A_{current} - A_{target}| \le 5 \text{ feet}$.
*   **NFR 3 (Plain English - Reliability/Availability):** The altitude control system *shall* have a mean time between failures (MTBF) of at least 10,000 flight hours.
    *   **Formal:** $MTBF \ge 10,000 \text{ hours}$.
*   **NFR 4 (Plain English - Fault Tolerance):** The system *shall* be able to continue operation without interruption in the event of a single sensor failure (e.g., primary altimeter failure).
*   **NFR 5 (Plain English - Safety):** The system *shall* include self-diagnostic capabilities to detect internal malfunctions and report them to the cockpit display.

**Step 3: Draft a User Story**
*   **User Story (Plain English):** As a *pilot*, I want the *aircraft to precisely maintain a commanded altitude* so that I can *focus on other critical flight parameters and ensure passenger comfort and safety*.

**Step 4: Define Acceptance Criteria for the User Story**
*   **AC 1 (Plain English):** Given the aircraft is in stable flight at 10,000 feet, When the pilot sets the target altitude to 10,000 feet, Then the system maintains the altitude between 9,995 and 10,005 feet.
    *   **Why it works:** Verifies FRs 1, 2, 3, 4 and NFR 2 (accuracy).
*   **AC 2 (Plain English):** Given the aircraft is climbing at 500 fpm towards 10,000 feet, When it reaches 10,000 feet, Then the system levels off and maintains altitude within $\pm 5$ feet within 10 seconds.
    *   **Why it works:** Verifies system response during a transition and NFR 2.
*   **AC 3 (Plain English):** Given the aircraft is maintaining target altitude, When the primary altimeter fails, Then the system automatically switches to a backup altimeter, and the altitude is maintained within $\pm 5$ feet without pilot intervention.
    *   **Why it works:** Verifies NFR 4 (fault tolerance) and NFR 2 (accuracy).
*   **AC 4 (Plain English):** Given the system is performing altitude control, When a change in target altitude is commanded, Then the system's response to adjust thrust and achieve the new altitude begins within 20 milliseconds.
    *   **Why it works:** Verifies NFR 1 (real-time performance).

**Reflection:** This safety-critical example demonstrates how NFRs, especially those related to real-time performance, accuracy, reliability, and fault tolerance, become paramount. The acceptance criteria must be extremely precise and cover failure scenarios to ensure safety. The "what could go wrong" here is literally life or death.

---

## 6. Common mistakes and traps

Students and even experienced professionals often fall into several traps when dealing with requirements:

1.  **Confusing Functional and Non-Functional Requirements:** This is the most common mistake. People often mix "what it does" with "how well it does it." Forgetting the distinction leads to poorly structured requirements and difficulty in testing.
    *   *Why it happens:* The line can sometimes feel blurry, especially when a function has an implicit quality (e.g., "login" implies it should be secure, but security is an NFR).
2.  **Vague or Ambiguous Requirements:** Using subjective terms like "user-friendly," "fast," "robust," or "efficient" without concrete, measurable metrics.
    *   *Why it happens:* It's easier to write general statements than to dig for specific, quantifiable details. Stakeholders might also be vague about their true needs.
3.  **Missing Requirements (Implicit Assumptions):** Failing to document obvious (to some) or critical features/qualities, assuming they will be understood or implicitly handled. This includes edge cases and error handling.
    *   *Why it happens:* Over-familiarity with the domain, lack of thorough analysis, or insufficient stakeholder engagement can lead to overlooking crucial details.
4.  **Unrealistic or Unachievable Requirements:** Demanding impossible performance, features, or timelines given the technology, budget, or constraints.
    *   *Why it happens:* Lack of technical understanding from stakeholders, or a desire for the "perfect" system without considering practical limitations.
5.  **Lack of Stakeholder Involvement:** Requirements are gathered in isolation, without continuous feedback and validation from the actual users or business owners.
    *   *Why it happens:* Poor communication, organizational silos, or a belief that requirements can be "collected" once and then ignored.
6.  **Acceptance Criteria Too Broad or Too Narrow:** Acceptance criteria that don't fully cover the user story's intent, or conversely, criteria that test things outside the scope of the current story.
    *   *Why it happens:* Rushing the AC definition, not thinking through all possible scenarios, or trying to combine too much into one criterion.

## 7. Textbook-precise explanation

In the formal discipline of Software Engineering, requirements are systematically elicited, analyzed, specified, validated, and managed. This entire process is known as **Requirements Engineering**.

1.  **Requirement:**
    A condition or capability needed by a user to solve a problem or achieve an objective. A condition or capability that must be met or possessed by a system or system component to satisfy a contract, standard, specification, or other formally imposed document. (IEEE Standard 610.12-1990, *IEEE Standard Glossary of Software Engineering Terminology*)
    More broadly, a requirement is a statement of what the system must do or what characteristics it must have. (Pressman, Software Engineering: A Practitioner's Approach, 8e, §5.1)

2.  **Functional Requirements (FRs):**
    These are statements of services the system should provide, how the system should react to particular inputs, and how the system should behave in particular situations. They describe the functions that the system is to perform. (Sommerville, Software Engineering, 10e, §4.1)
    Formally, a functional requirement $FR_i$ specifies a behavior $B_i$ that the system $S$ must exhibit under specific conditions $C_i$. This can often be modeled as a predicate $P(S, B_i, C_i)$ which evaluates to true if the system behaves as required.

3.  **Non-Functional Requirements (NFRs):**
    These are constraints on the services or functions offered by the system. They often relate to emergent system properties such as reliability, response time, and store occupancy. NFRs define the quality attributes of the system. (Sommerville, Software Engineering, 10e, §4.2)
    NFRs are typically concerned with the 'ilities' (e.g., usability, reliability, scalability, maintainability, portability, security) and performance characteristics. They are often quantified and measurable.
    Formally, a non-functional requirement $NFR_j$ defines a measurable quality attribute $Q_j$ that the system $S$ must satisfy, often within a specified quantitative threshold $T_j$. This can be expressed as an inequality, e.g., $Q_j(S) \le T_j$ or $Q_j(S) \ge T_j$.

4.  **User Story:**
    An informal, natural language description of one or more features of a software system. It is written from the perspective of an end-user or stakeholder. User stories are a cornerstone of Agile methodologies, promoting a focus on user value and facilitating iterative development. (Cohn, User Stories Applied: For Agile Software Development, §2)
    The canonical format for a user story is: "As a <role>, I want <goal/desire> so that <benefit/reason>." This structure ensures clarity on who wants what and why.

5.  **Acceptance Criteria:**
    A set of conditions that must be satisfied for a software feature (typically represented by a user story) to be considered complete and correct. They serve as a shared understanding between the development team and stakeholders about what "done" means. Acceptance criteria are specific, measurable, achievable, relevant, and time-bound (SMART). They are often expressed in a structured format, such as Gherkin (Given-When-Then), to facilitate automated testing. (Adzic, Bridging the Communication Gap: Specification by Example and Agile Acceptance Testing, §3)
    Formally, for a given user story $US$, a set of acceptance criteria $AC = \{ac_1, ac_2, \dots, ac_n\}$ must all be satisfied for $US$ to be considered implemented. Each $ac_k$ is a testable assertion about the system's behavior under specific conditions.

## 8. ASCII diagrams

This diagram illustrates the relationship between the different types of requirements and how user stories and acceptance criteria fit into the overall picture.

```text
+-------------------------------------------------------------------+
|                           PROJECT SCOPE                           |
| (What are we building? Why? For whom?)                            |
+-------------------------------------------------------------------+
       |
       V
+-------------------------------------------------------------------+
|                        REQUIREMENTS ELICITATION                   |
| (Gathering needs from stakeholders)                               |
+-------------------------------------------------------------------+
       |
       V
+-------------------------------------------------------------------+
|                             REQUIREMENTS                          |
| (The complete set of "what" and "how well" the system must be)    |
+-------------------------------------------------------------------+
       |                                   |
       |  (Describes specific behaviors)   | (Describes qualities, constraints, performance)
       V                                   V
+------------------+             +-----------------------+
|   FUNCTIONAL     |             |    NON-FUNCTIONAL     |
| (What it DOES)   |             | (How well it DOES it) |
|   - Login        |             |   - Performance (e.g., <2s)  |
|   - Search       |             |   - Security (e.g., AES-256) |
|   - Save Data    |             |   - Usability (e.g., mobile-friendly)|
+------------------+             |   - Scalability, Reliability, etc.   |
       |                         +-----------------------+
       | (Often broken down into)            ^
       V                                     | (Apply across the entire system,
+------------------------------------+       |  including to specific functions)
|             USER STORIES           |       |
| "As a <role>, I want <goal> so <value>."  |
| - As a customer, I want to add items to my cart... |
| - As an admin, I want to manage users...   |
+------------------------------------+
       |
       | (Each User Story is defined by)
       V
+------------------------------------+
|         ACCEPTANCE CRITERIA        |
| (Specific, testable conditions for a User Story) |
| - GIVEN [context]                  |
| - WHEN [event]                     |
| - THEN [outcome]                   |
|                                    |
| Example for "Add to Cart" User Story: |
| - GIVEN I am on a product page, WHEN I click "Add to Cart", THEN the item is added to my cart. |
| - GIVEN my cart is full, WHEN I click "Add to Cart", THEN I see an error message. |
+------------------------------------+
```

## 9. Memory technique — never forget this

1.  **Specific Mnemonic / Visual Hook:**
    Think of building a **F.N.U.A.** house (pronounced "Fun-NU-Ah!").
    *   **F**unctional: What **F**eatures does the house have? (e.g., 3 bedrooms, a kitchen, a garage) - These are the *actions* the house enables.
    *   **N**on-functional: How **N**icely is the house built? (e.g., energy-efficient, earthquake-resistant, beautiful aesthetics) - These are the *qualities* of the house.
    *   **U**ser Story: Who **U**ses the house and what do they want? (e.g., "As a family, I want 3 bedrooms so each child has their own space.") - The *person's desire*.
    *   **A**cceptance Criteria: How do we **A**ssess if the house is done right? (e.g., "The house has exactly 3 separate rooms with windows and closets designated as bedrooms.") - The *testable checklist*.

2.  **1-3 Formulas/Facts They MUST Overlearn:**
    *   **FR = WHAT it does.** (Verb/Action)
    *   **NFR = HOW WELL it does it.** (Adjective/Quality/Constraint, often measurable)
    *   **User Story Format:** "As a `<role>`, I want `<goal>` so that `<benefit>`."
    *   **Acceptance Criteria Format:** GIVEN `<context>`, WHEN `<event>`, THEN `<outcome>`.

3.  **Spaced-Repetition Schedule:**
    *   Review this lesson:
        *   1 day after initial study.
        *   3 days after the first review.
        *   7 days after the second review.
        *   16 days after the third review.
        *   35 days after the fourth review.
    *   During each review, actively recall the definitions, examples, and distinctions without looking at the notes first.

4.  **First-Principles Re-derivation Pathway:**
    If you forget the definitions, go back to basics:
    *   **Why are we building software at all?** To solve a problem or fulfill a need for someone.
    *   **What does that "someone" need?** They need the software to *do* specific things (Functional) and to *be* of a certain quality (Non-functional).
    *   **How do we capture what that "someone" needs in a human-centric way?** By telling a story from their perspective – a User Story.
    *   **How do we know when we've successfully built what that "someone" needed?** By having a clear, verifiable checklist – Acceptance Criteria.
    This pathway always brings you back to the core purpose and utility of each concept.

## 10. Connections — what this leads to

A strong grasp of requirements is fundamental to almost every subsequent phase and concept in software engineering and computer science. It's the bedrock upon which successful systems are built.

*   **Software Design and Architecture:** Well-defined functional requirements directly inform the system's features and modules. Non-functional requirements (e.g., performance, scalability, security) are crucial drivers for architectural decisions, choice of technologies, and design patterns. An architect cannot design a robust system without knowing its NFRs.

*   **Testing and Quality Assurance (QA):** Acceptance criteria are the direct input for test case creation. For every "Given-When-Then" statement, a corresponding test can be written. NFRs drive specialized testing like performance testing (load, stress), security testing, and usability testing. Without clear requirements, testing becomes arbitrary and ineffective.

*   **Project Management (especially Agile/Scrum):** User stories are the primary unit of work in Agile methodologies. They populate the product backlog, are estimated by development teams, and are used for sprint planning and progress tracking. Understanding user stories and their acceptance criteria is essential for effective sprint execution and delivery.

*   **System Analysis and Business Analysis:** This field is entirely focused on understanding business needs and translating them into clear, actionable software requirements. Proficiency in functional vs. non-functional requirements, and the ability to articulate them as user stories, is a core competency for system analysts.

*   **User Experience (UX) Design:** User stories provide direct insight into user goals and motivations, guiding UX designers in creating intuitive and effective interfaces. Usability NFRs are paramount for UX success, ensuring the system is not just functional but also a pleasure to use.

*   **Risk Management:** Unclear, incomplete, or ambiguous requirements are a leading cause of project failure. A thorough understanding of requirements helps identify potential risks early (e.g., technical feasibility, scope creep, stakeholder misalignment) and mitigate them.

*   **Maintenance and Evolution:** Clearly documented requirements make it easier to understand, modify, and extend existing software. When new features are requested, they can be traced back to existing requirements or new ones can be added systematically.

## 11. Self-check questions

1.  A banking application needs to allow users to transfer money between their accounts. It also needs to process these transfers within 2 seconds. Identify which part is a Functional Requirement and which is a Non-Functional Requirement. Explain your reasoning.
2.  Write a user story for a feature that allows a student to submit an assignment in an online learning portal. Ensure it follows the standard "As a..., I want..., so that..." format.
3.  For the user story you wrote in Question 2, provide at least three distinct acceptance criteria using the "Given-When-Then" format. Consider both successful and unsuccessful scenarios.
4.  Consider a mission-critical system, like air traffic control software. Name one potential Non-Functional Requirement related to "Availability" and explain why it would be more stringent than for a typical social media application.
5.  You are tasked with building a new photo-sharing application. A stakeholder states, "The app should be very easy to use." Transform this vague statement into a more concrete, measurable Non-Functional Requirement. Then, propose a functional requirement that would contribute to this NFR, and a corresponding acceptance criterion.