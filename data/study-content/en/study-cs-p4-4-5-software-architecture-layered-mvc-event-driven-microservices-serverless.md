## 1. The one-sentence answer
**Software architecture patterns are standardized ways of partitioning a system into components and defining their interactions so that the resulting structure satisfies explicit quality attributes such as maintainability, scalability, and evolvability.**

Layered architecture divides a system into horizontal strata where each layer supplies services only to the layer above and consumes services only from the layer below. MVC refines this idea by separating domain logic, user interface, and control flow into three collaborating roles. Event-driven architecture replaces direct calls with asynchronous messages, allowing components to react to state changes without knowing one another’s identities. Microservices and serverless push the same principle of decoupling further: the former splits the system into independently deployable processes, while the latter removes the notion of a continuously running server altogether.

These patterns are not mutually exclusive; a single application can combine a layered core, an event bus for inter-service communication, and serverless functions for sporadic workloads.

> [!NOTE]
> The decisive insight is that architecture is chosen for the *properties it guarantees under change*, not merely for the features it delivers today.

## 2. Why this matters — concrete and current
NASA’s Perseverance rover flight software uses a layered architecture with a hardware-abstraction layer, a real-time executive, and science-application layers; this separation allowed the same core to be reused across multiple Mars missions while swapping only the lowest layer for new sensors.

Google’s Gmail backend began as a monolithic MVC application; after sustained growth it was decomposed into microservices so that the search, storage, and notification teams could release independently, reducing cross-team coordination time from weeks to hours.

AWS Lambda and similar serverless platforms power the backend of Netflix’s recommendation engine for low-traffic personalization tasks; the company reports that serverless functions handle millions of invocations per day with zero idle capacity cost.

Event-driven microservices underpin Uber’s real-time pricing engine: a “ride requested” event triggers independent services for surge calculation, driver matching, and payment pre-authorization, each scaled and deployed on its own schedule.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Abstraction              | Every pattern hides implementation details behind interfaces |
| Coupling and cohesion    | Patterns are evaluated by how they reduce coupling while preserving cohesion |
| Asynchronous messaging   | Required to understand event-driven, microservices, and serverless communication |
| Deployment topology      | Microservices and serverless are defined by independent deployment units |

## 4. Building the idea — from intuition to formalism

### Step 1 — Separate concerns by responsibility
A program that mixes user-interface code with persistence logic forces every change to ripple through unrelated modules.  
Example: a single file that both renders HTML and executes SQL.  
Formally, let \(C\) be the set of concerns; a partition \(P = \{C_1, \dots, C_k\}\) is valid when each \(C_i\) maps to a distinct module whose interface mentions only its own concern.  
> [!WARNING]  
> Treating “concern” as vague intuition instead of an explicit list produces partitions that look clean on paper yet still mix responsibilities at runtime.

### Step 2 — Impose a total order to obtain layers
Once concerns are separated, order them so that layer \(L_i\) may depend only on \(L_{i-1}\).  
Example: presentation depends on business logic; business logic depends on data access.  
Formally, the dependency relation becomes a strict partial order that is extended to a total order, guaranteeing acyclic call graphs between strata.

### Step 3 — Specialize the top two layers into MVC roles
The presentation layer is split into a passive View and an active Controller; the business layer becomes the Model.  
The Controller receives events, updates the Model, and the View observes Model changes.  
Formally, the triple \((M, V, C)\) satisfies: \(V\) is a pure function of \(M\), \(C\) mutates \(M\) but never renders pixels.

### Step 4 — Replace direct calls with event emission
Components publish events to a broker; subscribers register interest without holding references.  
Formally, communication is expressed as a relation \(E \times S\) where \(E\) is the set of event types and \(S\) the set of subscribers, removing the caller-callee edge from the static call graph.

### Step 5 — Bound each service by a single deployable unit
A microservice owns its data store and exposes a network interface; its internal layers remain hidden.  
Formally, the system is a set of processes \(\{P_i\}\) with \(\forall i \neq j, P_i \cap P_j = \emptyset\) in both code and persistent state.

### Step 6 — Abstract the execution environment entirely
Serverless functions are pure mappings from request to response with no visible host or process lifetime.  
Formally, the deployment unit is reduced to a function \(f : I \to O\) whose resource allocation is supplied by the platform.

### Step 7 — State the composite quality-attribute claim
A system built from the above sequence satisfies: maintainability \(\propto\) number of layers crossed by a change, scalability \(\propto\) number of independently deployable units, and operational cost \(\propto\) duration of resource occupancy.

## 5. Worked examples — every step shown

**Example 1 — Simple layered counter**  
*Given:* A console application that increments an integer and prints it.  
*Find:* A minimal layered decomposition.  
Step 1: Identify concerns → UI, logic, storage.  
Step 2: Order them → Presentation, Domain, Persistence.  
Step 3: Implement each as a separate class with a single public method.  
**Final structure**  
```
Presentation → Domain → Persistence
```
*Reflection:* The example is trivial yet already demonstrates that a change to storage never touches the console code.

**Example 2 — MVC web form**  
*Given:* An HTTP endpoint accepting a name and greeting the user.  
*Find:* MVC mapping.  
Model = `User(name)`; View = HTML template; Controller = route handler that instantiates the model and selects the view.  
**Final mapping**  
```
POST /greet → Controller → User → View
```
*Reflection:* The controller contains no HTML strings, satisfying the pure-function rule for the view.

**Example 3 — Event-driven order processing**  
*Given:* Three services that must react to a new order.  
*Find:* Event flow.  
Publish “OrderCreated”; inventory, billing, and notification services each subscribe independently.  
**Final flow**  
```
OrderService → EventBus → [Inventory, Billing, Notify]
```
*Reflection:* Adding a fourth service requires only a new subscription, never a code change in the publisher.

**Example 4 — Serverless image thumbnail**  
*Given:* An S3 upload that must produce three resized images.  
*Find:* Deployment units.  
One Lambda function triggered by the S3 event; no persistent server.  
**Final unit**  
```
f : (S3Event) → (3× resized images)
```
*Reflection:* Scaling is automatic; cost is incurred only during the few hundred milliseconds of execution.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Treating MVC as merely “three folders” | Developers equate folders with roles        | Enforce that View is a pure projection of Model |
| Placing business logic inside event handlers | Desire for quick feature delivery           | Keep handlers as thin adapters to domain services |
| Sharing a database across microservices | Fear of distributed transactions            | Give each service its own schema and use sagas |
| Writing long-running serverless functions | Misunderstanding the billing model          | Split work into chained invocations or step functions |
| Adding a new layer for every abstraction | Over-generalization of “separation”         | Require a measurable quality-attribute benefit |
| Ignoring cold-start latency in serverless | Focus only on steady-state throughput       | Measure p99 latency under realistic idle periods |
| Circular dependencies between layers | Incremental refactoring without re-checking | Use static analysis to enforce layer ordering |

## 7. The textbook-precise statement
A software architecture is a set of *architectural elements* (components, connectors, data) together with a *configuration* that satisfies a collection of *quality-attribute scenarios* (Bass, Clements, Kazman, *Software Architecture in Practice*, 4e, §2.2). Layered, MVC, event-driven, microservices, and serverless styles are distinguished by the topological constraints they impose on the configuration and by the quality attributes they guarantee under those constraints.

## 8. Visual — diagram or schematic
```text
Layered (left)               Event-Driven (right)
+-------------+             +-------------+
| Presentation|             |   Producer  |──┐
+-------------+             +-------------+  │
       │                                     │ Event Bus
+-------------+             +-------------+  │
|  Business   |             |  Consumer A |◄─┘
+-------------+             +-------------+
       │                    +-------------+
+-------------+             |  Consumer B |
| Persistence |             +-------------+
+-------------+
```
The left column shows strict downward dependencies; the right column shows publish-subscribe decoupling via a central broker.

## 9. The memory technique
1. **The hook** — Picture a medieval castle: layers are successive walls, MVC is the throne room with its herald and scribe, events are carrier pigeons, microservices are independent keeps, and serverless is a tent that appears only when needed.  
2. **What to overlearn** — The dependency direction of layers, the Model-View separation rule, and the single-responsibility boundary of a microservice.  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive from the single principle “a change should affect the smallest possible number of modules while preserving observable behavior.”

## 10. What this unlocks
These patterns supply the vocabulary and constraints needed for subsequent topics in distributed systems, cloud-native design, and domain-driven design.  
- Designing data pipelines that combine event-driven microservices with serverless transforms  
- Evaluating trade-offs in CQRS and event-sourcing architectures  
- Performing architecture-level performance and failure-mode analysis  
- Selecting deployment topologies that match regulatory isolation requirements

## 11. Self-check — five questions, no answers
1. In a four-layer system, which layer must never contain SQL statements?  
2. Show a minimal counter-example where an MVC Controller violates the “View is a pure function of Model” rule.  
3. Given three microservices that all need the same lookup table, what two architectural choices avoid sharing a database?  
4. A serverless function runs for 15 minutes on every request; which quality attribute is most obviously degraded?  
5. Draw the call-graph difference between a layered monolith and the same system expressed as event-driven microservices; annotate every removed edge.