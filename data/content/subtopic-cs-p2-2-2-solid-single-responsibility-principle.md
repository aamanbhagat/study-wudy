## What it is
The Single Responsibility Principle (SRP) states that a class should have one, and only one, reason to change. This means a class should encapsulate a single, well-defined responsibility or job. If a class performs multiple distinct jobs, it violates this principle.

## Why it matters
In high-stakes environments like aerospace software or physics simulations, a change in one part of the system must not have unintended consequences elsewhere. SRP is a primary tool for building this robustness. For example, if the software module that controls a rocket's engine gimbal (`EngineController`) also handles logging telemetry to a specific database format (`TelemetryLogger`), a change in the database schema could force a re-compilation and re-validation of the critical engine control logic. By separating these responsibilities, you can modify the logging system with zero risk to the flight controls.

## When to study it
You should understand the fundamentals of Object-Oriented Programming before tackling this. Specifically, be comfortable with:
*   Classes and Objects
*   Methods and Attributes (or Properties)
*   The concept of encapsulation

If you have not yet written a program with at least a few interacting classes, pause and do that first. This principle is about organizing logic *between* and *within* classes, so you need that context.

## How to study it (step by step)
1.  **Read the canonical definition.** Find Robert C. Martin's original formulation of the principle. Focus on his clarification that the "reason to change" is tied to an "actor"—a user or stakeholder. A class should be responsible to a single actor.
2.  **Identify a violation.** Find a "God Class" in a project you've written or an online example. Look for a class that does everything: it holds data, validates it, saves it to a database, and formats it for a UI. List out the distinct responsibilities you can identify.
3.  **Perform a refactoring.** Take the class from the previous step and split it. Create new classes, each dedicated to one of the responsibilities you identified. For example, split a `User` class into `User` (data), `UserValidator` (business rules), and `UserRepository` (persistence).
4.  **Write a unit test.** Write a simple test for one of the new, smaller classes (e.g., `UserValidator`). Notice how straightforward it is: you don't need to set up a database connection or a UI framework just to test a single validation rule. This highlights the testability benefit of SRP.
5.  **Analyze the "Axis of Change".** For a class in a system you know well, list the potential future changes. Who would request them? A financial analyst? A UI designer? A database administrator? If requests from different people would cause changes in the same class, you have likely found an SRP violation.

## Key ideas, with intuition
1.  **Cohesion:** This is the measure of how strongly related the elements inside a single module (like a class) are. SRP forces high cohesion. A class `Vector3D` with methods for addition, dot product, and magnitude is highly cohesive; all its methods operate on 3D vector math. If you added a `save_to_database()` method, cohesion would drop because database logic is unrelated to vector mathematics.
2.  **Coupling:** This is the measure of how dependent one module is on another. SRP reduces coupling. When a class has many responsibilities, it becomes coupled to many other parts of the system that depend on those responsibilities. When you change it for one reason, you risk breaking functionality for all the others. By separating responsibilities, you sever these dependencies.
3.  **"Reason to Change" is about People:** The most precise way to think about a "reason to change" is to think about the source of the change. The accounting department has requirements for calculating payroll. The database administrators have requirements for data persistence. These are different actors. Their needs change independently. Therefore, the code that serves them should be in separate classes.
4.  **Formalism via Sets:** Let a class $C$ be defined by a set of methods $M = \{m_1, m_2, ..., m_n\}$. Let the system have a set of distinct actors (sources of change) $A = \{a_1, a_2, ..., a_k\}$. SRP dictates that all methods in $M$ should exist to serve the needs of **only one** actor $a_j \in A$.
    $$ \forall m_i \in M, \text{actor}(m_i) = a_j $$
    If there exist methods $m_p, m_q \in M$ such that $\text{actor}(m_p) \neq \text{actor}(m_q)$, the principle is violated.

## Worked example
Let's consider a class in a physics simulation that models a particle. A naive implementation might violate SRP.

**The "Bad" Version (Violates SRP)**
```python
class Particle:
    def __init__(self, mass, position, velocity):
        self.mass = mass
        self.position = position # A tuple (x, y, z)
        self.velocity = velocity # A tuple (x, y, z)

    def update_position(self, force, delta_t):
        """Physics Calculation Responsibility"""
        # F = ma -> a = F/m
        acceleration = (force[0] / self.mass, force[1] / self.mass, force[2] / self.mass)
        # v_f = v_i + at
        self.velocity = (self.velocity[0] + acceleration[0] * delta_t,
                         self.velocity[1] + acceleration[1] * delta_t,
                         self.velocity[2] + acceleration[2] * delta_t)
        # p_f = p_i + vt
        self.position = (self.position[0] + self.velocity[0] * delta_t,
                         self.position[1] + self.velocity[1] * delta_t,
                         self.position[2] + self.velocity[2] * delta_t)

    def save_to_db(self, db_connection):
        """Data Persistence Responsibility"""
        cursor = db_connection.cursor()
        cursor.execute("INSERT INTO particles VALUES (?, ?, ?)", 
                       (self.mass, self.position, self.velocity))
        db_connection.commit()
```
This class has two responsibilities:
1.  **Physics Simulation:** It knows the laws of motion and can update its own state. The "actor" is a physicist or the simulation engine designer.
2.  **Database Persistence:** It knows how to write its state to a SQL database. The "actor" is a database administrator or a data scientist.

If the DBA decides to change the database schema (e.g., from SQL to a NoSQL document store), we have to modify the `Particle` class. This is dangerous because it forces us to touch and re-test the physics logic.

**The "Good" Version (Adheres to SRP)**
We refactor this into two classes.

```python
class Particle:
    """Holds the state of a particle. Has no other responsibility."""
    def __init__(self, mass, position, velocity):
        self.mass = mass
        self.position = position
        self.velocity = velocity

class PhysicsEngine:
    """Handles the physics calculations."""
    @staticmethod
    def update_particle_position(particle, force, delta_t):
        # ... same physics logic as before ...
        # This method now modifies the particle object passed to it.
        # (Implementation details omitted for brevity, but it's the same logic)
        pass

class ParticleRepository:
    """Handles persistence of particle data."""
    def __init__(self, db_connection):
        self.db = db_connection

    def save(self, particle):
        cursor = self.db.cursor()
        cursor.execute("INSERT INTO particles VALUES (?, ?, ?)", 
                       (particle.mass, particle.position, particle.velocity))
        self.db.commit()
```

**Reflection:**
*   The `Particle` class is now a simple data structure. Its only reason to change is if the intrinsic properties of a particle change (e.g., we add `charge`).
*   The `PhysicsEngine` class is responsible for one thing: implementing the laws of physics. It can be changed and tested in isolation.
*   The `ParticleRepository` class is responsible for one thing: persistence. If the database changes, this is the only class we need to modify. The `Particle` and `PhysicsEngine` classes are completely unaffected.

## Diagrams
Here is a diagram showing the coupling before and after applying SRP.

**Before SRP (High Coupling):**
```text
                       +----------------------------------+
                       |             Particle             |
                       +----------------------------------+
                       | - mass                           |
                       | - position                       |
                       | - velocity                       |
                       +----------------------------------+
                       | + update_position(...)           |  <-- Physics Logic
                       | + save_to_db(...)                |  <-- Persistence Logic
                       +----------------------------------+
                                 ^           ^
                                 |           |
               +-----------------+           +-------------------+
               |                                                 |
+--------------------------+                      +-------------------------------+
|   Physics Simulation     |                      |      Database Schema          |
|  (Needs position update) |                      | (Defines how data is stored)  |
+--------------------------+                      +-------------------------------+
```

**After SRP (Low Coupling):**
```text
+-------------------+      +--------------------+      +-----------------------+
|     Particle      |      |   PhysicsEngine    |      |  ParticleRepository   |
+-------------------+      +--------------------+      +-----------------------+
| - mass            |      | + update_particle_ |      | + save(particle)      |
| - position        |      |   position(...)    |      |                       |
| - velocity        |      +--------------------+      +-----------------------+
+-------------------+               ^                            ^
         ^                          |                            |
         |                          |                            |
         +--------------------------+----------------------------+
         |                          |                            |
+--------------------------+        |             +-------------------------------+
|   Physics Simulation     |--------+             |      Database Schema          |
| (Uses PhysicsEngine and  |                      | (Only affects the Repository) |
|      Particle data)      |                      +-------------------------------+
+--------------------------+
```

## Memory technique — remember this forever
1.  **The Story:** Think of a chef in a kitchen. The chef's single responsibility is to cook. A different person, the waiter, has the responsibility to take the order and deliver the food. A third person, the dishwasher, cleans the plates. If the chef had to do all three jobs, the kitchen would be slow, chaotic, and a change in the menu (a "cooking" change) would mess up the dishwashing process. **A class should be like a specialist in a kitchen, not a one-person-show.**
2.  **Overlearn These Facts:**
    *   "A class should have one, and only one, reason to change."
    *   SRP increases cohesion and decreases coupling.
3.  **Spaced Repetition Schedule:** Review this material at: 1 day, 3 days, 7 days, 16 days, 35 days.
4.  **First Principles Pathway:** If you forget SRP, ask yourself: "If I make a change to this class, what is the 'blast radius' of features I might break?" The goal of good design is to minimize this blast radius. SRP is a direct strategy for this: by ensuring a class only does one thing, you guarantee that changes to it are localized to that one single feature or responsibility. It derives from the fundamental need to manage complexity and reduce risk.

## Common mistakes
1.  **Confusing "One Method" with "One Responsibility":** A class can have many methods and still have a single responsibility. Our `ParticleRepository` might have `save()`, `load()`, `delete()`, and `update()` methods. This is fine, because they all serve the single responsibility of persistence.
2.  **Premature Fragmentation:** Applying SRP too aggressively can lead to an explosion of tiny classes that don't do much, making the codebase harder to navigate. The principle is a heuristic, not a law. If two things almost always change together for the same reason, it can be pragmatic to keep them in the same class.
3.  **Ignoring the "Actor":** Defining a "responsibility" can be vague. The most robust way to apply SRP is to think about the actors (users, stakeholders, other systems). If two changes are requested by different actors, the code for them should be in different classes.

## Self-check
1.  A class `Report` contains a method `generate_html()` and another method `send_email(recipient, html_content)`. Does this design violate SRP? If so, how would you refactor it?
2.  Consider a class `Spaceship` in a game. It has methods to `fire_lasers()`, `update_position()`, and `render_on_screen()`. Identify the distinct responsibilities. Propose a new class structure that adheres to SRP and explain the primary benefit of your new design.
3.  SRP is often summarized as "Do one thing and do it well." This is an oversimplification. Explain why "A class should have only one reason to change" is a more precise and useful definition, especially in the context of a large, evolving software project. Use the concept of "actors" in your explanation.