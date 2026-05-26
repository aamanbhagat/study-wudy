## 1. The one-sentence answer
**Single Responsibility Principle (SRP) states that a class should have only one reason to change.**

Iska matlab yeh hai ki har class ek hi job ke liye responsible honi chahiye. Agar aap ek class mein multiple responsibilities daal dete ho, toh jab bhi unme se koi ek bhi badlegi, class ko modify karna padega aur yeh baaki code ko bhi affect karega. SRP ko follow karne se aapki classes chhoti, focused aur easy-to-maintain banti hain.

Real mein yeh principle aapko force karti hai ki ek class ko sirf ek actor (user, system ya requirement) ke liye kaam karna chahiye. Jab responsibilities alag-alag actors se aati hain, unhe alag classes mein rakhna padta hai.

> [!NOTE]
> The deepest insight in SRP is not “make classes small”; it is “identify the single actor whose requirements will force the class to change, then isolate everything else.”

## 2. Why this matters — concrete and current
Google’s Borg and later Kubernetes scheduler components were refactored so that the Pod scheduling logic lives in a single-responsibility Scheduler class while metrics collection, node health and API serving each live in separate packages. One change in scheduling policy no longer risks breaking the API server.

In the Mars Perseverance rover flight software, JPL engineers separated the propulsion control loop from the telemetry formatting module precisely because both subsystems are owned by different teams and change on independent schedules; a single class handling both would have created a single point of failure during critical entry-descent-landing sequences.

Modern Android’s Jetpack ViewModel and the newer Compose ViewModel are deliberately split so that UI state management never mixes with business-rule validation; this separation lets Google update the lifecycle library without touching domain logic in millions of apps.

In semiconductor design at TSMC, the physical-design rule-check engine is kept in a dedicated class while the netlist parser lives elsewhere; a change in EUV lithography rules must not force recompilation of the entire synthesis tool chain.

Amazon’s DynamoDB stream processing layer isolates the “exactly-once delivery” responsibility into its own class so that the storage engine team can evolve durability guarantees without touching the consumer-side checkpointing logic.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Class and object         | SRP is defined at the class level                         |
| Cohesion                 | SRP is the mechanism that produces high cohesion          |
| Coupling                 | Violating SRP increases unwanted coupling between modules |
| Actor / stakeholder      | The “one reason to change” is always an actor’s requirement |

If any row above is unfamiliar, pause and review basic OOP terminology before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Identify the actor
A class changes when an actor’s requirement changes. The first task is therefore to name the actor explicitly.

Example: an `Invoice` class used by both the accounting department (tax rules) and the printing department (layout). Two actors imply two responsibilities.

Formal statement: Let \(A\) be the set of actors that can request a change in class \(C\). SRP requires \(|A| = 1\).

> [!WARNING]
> If you name the actor as “the user” instead of a concrete role, you will almost always miss multiple responsibilities.

### Step 2 — Count the reasons to change
List every requirement that can force source-code edits inside the class.

Example: adding a new tax jurisdiction, changing the PDF footer, or switching from monthly to quarterly reporting are three distinct reasons.

Formal: A reason to change is any requirement \(r\) such that the delta in specification \(\Delta S_r\) maps to a non-empty edit set inside \(C\).

> [!WARNING]
> Treating “bug fixes” as a single reason hides the fact that different actors report different classes of bugs.

### Step 3 — Extract the secondary responsibility
Once two or more reasons exist, move the code that serves the secondary actor into a new class.

Example: move all PDF formatting into `InvoicePrinter`; keep only calculation logic in `Invoice`.

Formal: Let \(C = C_1 \cup C_2\) where \(C_1\) serves actor \(A_1\) and \(C_2\) serves \(A_2\). Create classes \(C_1'\) and \(C_2'\) such that \(C_1' \cap C_2' = \emptyset\).

> [!WARNING]
> Extracting only data fields while leaving behaviour behind creates an anemic model that still violates SRP.

### Step 4 — Make the new class the single source of truth
The original class should now delegate to the extracted class rather than duplicate logic.

Example: `Invoice` holds a reference to `InvoicePrinter` and calls `print()` when needed.

Formal: Dependency direction follows the single-responsibility boundary: \(C_1' \rightarrow C_2'\) or vice-versa according to ownership.

> [!WARNING]
> Bidirectional dependencies re-introduce hidden reasons to change.

### Step 5 — Verify with the “one change, one place” test
After refactoring, any requirement change must touch exactly one class.

Example: new tax rule touches only `Invoice`; new logo touches only `InvoicePrinter`.

Formal: For every requirement \(r_i\) belonging to actor \(A_i\), the edit set \(E(r_i) \subseteq C_i'\).

> [!WARNING]
> If a one-line configuration change still requires edits in two classes, the boundary was drawn incorrectly.

## 5. Worked examples — har step show karo

**Example 1 — Trivial separation**
*Given:* A `Report` class that both computes statistics and writes CSV.
*Find:* Apply SRP.
- Identify actors: data analyst (statistics) and ops (file format).
- Extract `CsvWriter` class containing only file logic.
- `Report` now calls `CsvWriter.write(rows)`.
**Final answer**  
`Report` contains only computation; `CsvWriter` contains only formatting.  
*Reflection:* The split looks obvious yet prevents the common “let’s just add one more parameter” slide into god classes.

**Example 2 — Repository pattern**
*Given:* `UserService` that validates email, persists to DB and sends welcome email.
*Find:* Isolate persistence responsibility.
- Actor 1: registration workflow; Actor 2: database schema owner.
- Create `UserRepository` with only CRUD methods.
- `UserService` receives `UserRepository` via constructor.
**Final answer**  
`UserService` now changes only when registration rules change.  
*Reflection:* Constructor injection makes the responsibility boundary explicit and testable.

**Example 3 — GUI + domain**
*Given:* `OrderViewModel` that both holds UI state and calculates order total including discounts.
*Find:* Separate discount policy.
- Actor 1: UI framework; Actor 2: pricing team.
- Extract `DiscountPolicy` interface with `apply(Order)` method.
- ViewModel delegates total calculation to the policy.
**Final answer**  
Pricing changes never touch Android lifecycle code.  
*Reflection:* The interface is the seam that lets SRP survive across module boundaries.

**Example 4 — Microservice boundary**
*Given:* A monolithic `PaymentProcessor` handling tokenisation, fraud scoring and ledger posting.
*Find:* Split into three services.
- Actors: PCI compliance team, risk team, finance team.
- Three classes/services emerge: `TokenService`, `FraudScorer`, `LedgerPoster`.
- Each exposes its own API and owns its own database.
**Final answer**  
A change in fraud rules deploys independently of ledger schema migrations.  
*Reflection:* SRP at class level naturally scales to SRP at service level when boundaries are drawn by actor.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| “This class is still small”       | Size bias instead of actor bias             | Always name the actor first                          |
| Mixing data access with business logic | Convenience of one file                     | Force every I/O call through a repository interface  |
| God class that “coordinates everything” | Over-general “manager” noun                 | Replace Manager with explicit actor names            |
| SRP applied only to methods       | Thinking at method granularity              | Draw class boundaries before writing methods         |
| Over-fragmentation into 2-line classes | Misreading “one reason” as “one method”     | Keep cohesive behaviour together under one actor     |
| Circular dependency after split   | Forgetting to invert the dependency         | Introduce interface owned by the calling actor       |
| Logging mixed inside domain class | Treating logging as “infrastructure detail” | Route all logs through a logger interface            |

## 7. The textbook-precise statement
“A class should have only one reason to change.”  
— Robert C. Martin, *Agile Software Development, Principles, Patterns, and Practices*, 1st ed., §7.2 (2002).  
The hypothesis set is: (1) every class is owned by at least one actor, (2) each requirement change originates from exactly one actor, (3) the set of edits required by a requirement change is contained inside the class(es) owned by that actor.

## 8. Visual — diagram or schematic
```text
+---------------+          +-----------------+
|   Invoice     |          |  InvoicePrinter |
|---------------| uses     |-----------------|
| calcTotal()   |--------->| printPDF()      |
| applyTax()    |          | setLogo()       |
+---------------+          +-----------------+
      ^                           ^
      |                           |
   Actor: Accounting          Actor: Print Dept
```
The arrow shows delegation; each box owns exactly one actor’s requirements.

## 9. The memory technique
1. **The hook** — Picture a single chef who only cooks one dish; the moment he is asked to also wash dishes, the kitchen (class) must change for two different bosses.
2. **What to overlearn** — “One actor, one class” and the edit-set test \(E(r_i) \subseteq C_i'\).
3. **Spaced-repetition schedule** — Review the definition after 1 day, redraw the Invoice diagram after 3 days, refactor a 50-line god class after 7 days, explain SRP to someone else after 16 days, and re-derive the edit-set test after 35 days.
4. **First-principles fallback** — Ask “Which single human or team will request the next change?” then isolate everything else.

## 10. What this unlocks
SRP is the foundation for the remaining SOLID principles and for clean architecture. Once you can isolate responsibilities you can safely apply Open/Closed, Dependency Inversion, and eventually hexagonal or clean architecture patterns.

- Enables independent deployment of microservices  
- Makes unit testing trivial because each class has a single mock surface  
- Directly feeds into package-by-feature and package-by-actor directory layouts  
- Prepares the ground for the Interface Segregation Principle

## 11. Self-check — five questions, no answers
1. Name the two actors hidden inside a typical `UserController` that also sends emails.
2. A `Logger` class writes to both console and a remote syslog server. Does it violate SRP? Why?
3. Given a class that changed five times last month for five unrelated feature requests, how many actors are probably present?
4. After you split `PaymentService` into `Tokeniser` and `Ledger`, a new compliance rule appears that affects both. Which class should own the new rule and why?
5. Construct a minimal counter-example where applying SRP at method level instead of class level still leaves two reasons to change inside one class.