## 1. The one-sentence answer
**Software architecture patterns are reusable structural blueprints that organise code, data flow and deployment so a system remains understandable, scalable and maintainable as it grows.**

Layered architecture divides responsibilities into horizontal slices (presentation, business logic, data) so each layer talks only to the one below it. MVC refines the presentation layer by splitting user-facing code into Model, View and Controller. Event-driven architecture replaces direct calls with asynchronous messages, letting components react whenever something interesting happens. Microservices split the entire application into small, independently deployable services that communicate over the network. Serverless removes servers from the developer’s view by letting cloud providers run code only when events arrive.

> [!NOTE]
> The single deepest insight is that every pattern is a different answer to the same question: “Where do I draw the boundaries so that change in one place does not force change everywhere else?”

## 2. Why this matters — concrete and current
Netflix runs thousands of microservices behind its streaming platform; each service (recommendation, billing, video encoding) can be scaled or rewritten without touching the others, allowing the company to push hundreds of changes per day.

Amazon Web Services Lambda powers serverless workloads for companies such as Expedia; when a user searches for flights, thousands of short-lived functions execute only for the milliseconds they are needed, cutting infrastructure cost by more than 70 % compared with always-on servers.

Tesla’s Autopilot software uses an event-driven architecture inside the car: sensor data arrives as high-frequency events that trigger perception, planning and control modules without blocking each other, meeting the strict real-time deadlines required for safety.

Modern Android and iOS applications almost universally adopt MVC or its close relatives MVVM and VIPER; the separation lets UI designers modify screens while backend engineers change network logic without merge conflicts.

Google’s internal layered architecture for its search stack keeps crawling, indexing and ranking in distinct layers; a new ranking algorithm can be tested on the ranking layer alone without redeploying the crawler fleet.

## 3. Mental prerequisites

| Concept              | Why you need it here |
|----------------------|----------------------|
| Abstraction          | Lets you hide implementation details behind clean interfaces so each architectural boundary remains stable. |
| Coupling & cohesion  | Measures how much one module depends on another; all patterns aim to lower coupling while raising cohesion. |
| Asynchronous messaging | Required to understand event-driven, microservices and serverless communication. |
| Deployment pipeline  | Needed to see why microservices and serverless change release velocity. |

If any row above is unfamiliar, pause and read the corresponding section on modules and interfaces first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Separate concerns by responsibility
You group code that changes for the same reason and separate code that changes for different reasons. A concrete example: the code that draws buttons should never contain the SQL that fetches user data. Formally we say a module M has high cohesion when every element inside M contributes to a single, well-defined responsibility.

> [!WARNING]
> If you place two unrelated responsibilities in the same module, a change in one will force a recompile or redeploy of the other even though they share no logic.

### Step 2 — Draw explicit boundaries
Boundaries are places where data crosses from one owner to another under a contract. In layered architecture the contract is a function call; in microservices it is an HTTP or gRPC message. The boundary must be versioned so the two sides can evolve independently.

### Step 3 — Choose communication style
Synchronous calls assume the receiver is available now. Asynchronous events assume the receiver may be busy or even nonexistent at send time. Event-driven and serverless patterns rely on the asynchronous choice; layered and classic MVC usually stay synchronous inside a single process.

### Step 4 — Decide granularity of deployment
A monolith ships as one artefact. Microservices and serverless functions ship as many small artefacts. Granularity trades off operational complexity against independent scaling and team autonomy.

### Step 5 — Align architecture with team and business structure
Conway’s law states that organisations design systems that mirror their communication structure. A company with three teams will naturally produce three macro-services; attempting a different architecture without reorganising teams creates friction.

### Step 6 — Add observability and resilience at boundaries
Once boundaries exist, you can add retries, circuit breakers, distributed tracing and rate limiting exactly at those seams without touching business logic.

### Step 7 — Re-evaluate boundaries as requirements evolve
No architecture survives unchanged. The same system may begin layered, later adopt event-driven communication inside layers, then split into microservices when team count or traffic volume demands it.

## 5. Worked examples — har step show karo

**Example 1 — Simple three-layer web app**  
*Given:* A request arrives at the HTTP server.  
*Find:* Where each piece of logic should live.  
Step 1: Route handler receives raw HTTP → belongs in presentation layer.  
Step 2: Route handler calls a service object that contains business rules → business layer.  
Step 3: Service object calls repository that issues SQL → data layer.  
*Why* each move: keeps HTTP details out of business rules and SQL out of both.  
**Final answer:** three-layer separation.

*Reflection:* The example is simple yet already shows that changing the database driver only touches the data layer.

**Example 2 — Introduce MVC inside the presentation layer**  
*Given:* The same web app now needs two different UIs (web and mobile).  
*Find:* How to avoid duplicating business logic.  
Model holds user data and validation; View renders HTML or JSON; Controller receives input and updates Model.  
*Why* this move: business logic now lives only in Model, reusable across UIs.  
**Final answer:** MVC inside presentation layer.

*Reflection:* Students often place business logic inside the Controller; the reflection forces them to move it to Model.

**Example 3 — Convert a synchronous service to event-driven**  
*Given:* Order service must notify Inventory, Payment and Email services.  
*Find:* Replace direct HTTP calls with events.  
Order service publishes “OrderCreated” event; each consumer subscribes independently.  
*Why* this move: Order service no longer waits or knows about downstream services.  
**Final answer:** publish-subscribe topology.

*Reflection:* Failure handling moves from caller to the messaging broker; students must add dead-letter queues.

**Example 4 — Decompose monolith into microservices + serverless**  
*Given:* Image-upload feature inside a large e-commerce monolith.  
*Find:* Extract it while keeping the rest unchanged.  
Create an “ImageService” microservice; its resize function becomes an AWS Lambda triggered by S3 upload events.  
*Why* each decision: independent scaling for CPU-heavy resizing and zero server management.  
**Final answer:** hybrid microservices + serverless boundary.

*Reflection:* The new boundary forces you to decide on data ownership and eventual consistency.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Treating MVC as the whole architecture | Beginners equate “architecture” with the UI pattern they learned first | Draw the outer layers explicitly before adding MVC inside presentation |
| Chatty microservices | Developers split too finely and then call each other in a loop | Measure request fan-out; merge services when latency budget is exceeded |
| Event storms | Every state change emits an event without filtering | Define clear event granularity and use event versioning |
| Serverless cold-start surprises | Teams ignore language runtime and package size | Choose lightweight runtimes or provisioned concurrency for latency-critical paths |
| Distributed monolith | Microservices still share a single database | Enforce database-per-service rule from day one |
| Ignoring observability | Logging only inside services, not at boundaries | Mandate distributed tracing on every inter-service call |

## 7. The textbook-precise statement
Software architecture is “the set of principal design decisions about the system” (Taylor et al., *Software Architecture: Foundations, Theory, and Practice*, 2010, §1.2). A pattern is a documented solution to a recurring architectural problem that includes context, problem, solution, and resulting context. Layered, MVC, event-driven, microservices and serverless are five such patterns whose trade-offs are evaluated against quality attributes (performance, scalability, maintainability) using the Architecture Tradeoff Analysis Method (ATAM).

## 8. Visual — diagram or schematic
```
[Client]
   |
   v
[API Gateway] ----> [Auth Service] (microservice)
   |
   +--> [Order Service] --> (event) --> [Inventory Service]
   |         |                       (serverless fn)
   |         v
   |     [PostgreSQL] (layered data access)
   |
   +--> [Lambda Resize] (event-driven from S3)
```

## 9. The memory technique
**The hook:** Picture a building whose floors are layers, whose rooms are microservices, whose doors are events, whose lights turn on only when someone enters (serverless), and whose front desk is the controller that decides which room to show the visitor (MVC).

**What to overlearn:** (1) Each pattern’s primary decoupling mechanism, (2) the direction of dependency (always downward in layers), (3) the phrase “database per service”.

**Spaced-repetition schedule:** Review the one-sentence definition after 1 day, redraw the ASCII diagram after 3 days, list trade-offs after 7 days, explain a real production system after 16 days, and design a hybrid architecture from scratch after 35 days.

**First-principles fallback:** If you forget a pattern’s name, ask “What single change should not force a redeploy of everything else?” The answer points to the correct boundary and therefore the correct pattern.

## 10. What this unlocks
You can now evaluate any new framework or cloud offering by asking which architectural pattern it reinforces or violates.  

- Domain-driven design supplies the language to define service boundaries.  
- CQRS and event sourcing become natural extensions once you are comfortable with event-driven boundaries.  
- Chaos engineering and observability platforms are designed to verify that your chosen boundaries actually deliver resilience.  
- Team topologies and platform engineering emerge as organisational counterparts to microservices.

## 11. Self-check — five questions, no answers
1. In a layered architecture, can the presentation layer contain business rules? Justify with one sentence.  
2. Draw the dependency arrows for a system that uses both MVC and microservices; label each arrow with the communication style.  
3. An order service publishes 200 events per second; three downstream services each take 50 ms to process. Calculate the minimum number of concurrent consumers needed on one downstream service to avoid backlog growth.  
4. Identify the hidden coupling in a serverless function that reads from a relational database whose schema is owned by another team’s microservice.  
5. A startup begins with a single repository containing both web UI and recommendation engine. After two years it has 25 engineers. Which pattern should it adopt next and why?