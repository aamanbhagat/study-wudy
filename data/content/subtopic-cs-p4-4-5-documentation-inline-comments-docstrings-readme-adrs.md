## What it is
Software documentation is the set of human-readable explanations that accompany source code. It clarifies the code's purpose, architecture, and usage for different audiences, ranging from line-by-line comments for future developers to high-level architecture records for project maintainers. The goal is to make a software system understandable, maintainable, and usable by someone other than the original author—including the original author six months later.

## Why it matters
In high-stakes fields like aerospace and physics, documentation is not optional; it is a core part of the engineering process. For mission-critical flight software, every function must be documented to prove its correctness during verification and validation. In large-scale physics simulations or machine learning models, the documentation of assumptions, data sources, and parameters is the only way to ensure the experiment is reproducible and the results are scientifically valid.

## When to study it
You are ready for this topic. The only prerequisites are a basic understanding of programming constructs like functions, classes, and modules in at least one language. You should have written at least one small project (e.g., >200 lines of code) to have felt the pain of returning to your own code after a week and not remembering how it works.

## How to study it (step by step)
1.  **Comment the "Why":** Find a function you've written. Identify the most clever or non-obvious line of code. Add an inline comment above it that explains *why* you wrote it that way, not just *what* it does.
2.  **Define the Contract:** Take that same function and write a complete docstring for it. Use a standard format for your language (e.g., Google Style for Python, Javadoc for Java). Explicitly state the purpose, arguments, return values, and any exceptions it might raise.
3.  **Write the Front Door:** Imagine someone just downloaded your project. Write a `README.md` file in Markdown. It must include: a one-sentence project description, instructions for installation, and a simple example of how to run it.
4.  **Record a Decision:** Invent a significant design choice for your project. For example, "Why did I choose to use NumPy for matrix operations instead of writing my own from scratch?" Write a short Architecture Decision Record (ADR) explaining the context, the decision, and its consequences.
5.  **Reverse-Engineer from the Masters:** Go to a well-regarded open-source project on GitHub (e.g., `scipy`, `pandas`, `matplotlib`). Find and read its `README.md`, the docstring for a core function (like `scipy.integrate.quad`), any inline comments in that function's source code, and look for their ADRs or equivalent design documents.

## Key ideas, with intuition
1.  **Levels of Abstraction:** Documentation exists at different zoom levels, for different audiences. Think of it like a map. Inline comments are the street-level view for the developer navigating the code. Docstrings are the city map for someone using your public transit system (the API). The README is the tourist guide for a first-time visitor. ADRs are the historical society's records of why the city was built that way.
2.  **Code tells you *how*, comments tell you *why*.** The most common mistake is writing comments that state the obvious. The code is the ultimate source of truth for *what* is happening. Your documentation should provide the context that the code cannot.
    - Bad: `i = i + 1 # Increment i`
    - Good: `# We must process the last element, so we use a <= operator`
3.  **Documentation as a Contract:** A function's docstring is a formal contract with its user. It promises: "If you give me these specific inputs (arguments), I will guarantee these specific outputs (return values) or behaviors." This allows developers to use code without needing to read its entire implementation, which is fundamental to building large systems.
4.  **Decisions are Transient Knowledge:** Your reasoning for a major architectural choice is clear to you today, but it will fade. An Architecture Decision Record (ADR) is a simple, immutable document that captures the context and justification for a decision *at the time it was made*. This prevents future teams from wasting time re-litigating old decisions or breaking hidden assumptions.

## Worked example
Let's document a Python function to calculate the gravitational force between two objects, a common task in orbital mechanics simulations.

**Step 1: The Undocumented Code**
```python
import scipy.constants

def calculate_force(m1, m2, r):
    # What are the units? What if r is zero? Unclear.
    f = (scipy.constants.G * m1 * m2) / (r**2)
    return f
```

**Step 2: Add Inline Comment**
Here, the use of `scipy.constants.G` is fairly clear, but let's say we had a check for `r=0`.
```python
import scipy.constants

def calculate_force(m1, m2, r):
    if r == 0:
        # Avoid division by zero, which would yield infinity.
        # In a real simulation, this might indicate a collision.
        return float('inf')
    f = (scipy.constants.G * m1 * m2) / (r**2)
    return f
```
The comment explains the *intent* behind the `if` block, not just what it does.

**Step 3: Add a Docstring (The API Contract)**
```python
import scipy.constants

def calculate_force(m1, m2, r):
    """Calculates the gravitational force using Newton's law of universal gravitation.

    This function computes the magnitude of the force between two point masses.
    It assumes SI units for all inputs and outputs.

    Args:
        m1 (float): Mass of the first object in kilograms (kg).
        m2 (float): Mass of the second object in kilograms (kg).
        r (float): Distance between the centers of the two objects in meters (m).
                   Must be non-negative.

    Returns:
        float: The magnitude of the gravitational force in Newtons (N).
               Returns float('inf') if the distance r is 0.
    """
    if r == 0:
        # Avoid division by zero, which would yield infinity.
        # In a real simulation, this might indicate a collision.
        return float('inf')
    f = (scipy.constants.G * m1 * m2) / (r**2)
    return f
```
Now, a user knows exactly what to provide and what to expect, without reading the code.

**Step 4: Write a README Snippet**
```markdown
# OrbitSim

A simple library for physics simulations.

## Installation

```bash
pip install .
```

## Usage

Calculate the gravitational force between the Earth and the Moon.

```python
import orbitsim

earth_mass = 5.972e24 # kg
moon_mass = 7.342e22 # kg
distance = 3.844e8   # meters

force = orbitsim.calculate_force(m1=earth_mass, m2=moon_mass, r=distance)
print(f"Force: {force:.2e} Newtons")
# Expected output: Force: 1.98e+20 Newtons
```
This gets a new user started immediately.

**Step 5: Write an ADR**
```markdown
# ADR 001: Use SciPy for Physical Constants

- **Status:** Accepted
- **Date:** 2023-10-27
- **Context:** Our physics calculations require high-precision values for physical constants like G (Gravitational constant). We could hard-code these values or use a trusted external library.
- **Decision:** We will use `scipy.constants` for all physical constants.
- **Consequences:**
    - **Pro:** Constants are from a reliable, well-tested source (CODATA).
    - **Pro:** Reduces the chance of transcription errors.
    - **Con:** Adds SciPy as a project dependency. This is acceptable as we anticipate needing its other numerical capabilities later.
```
This records the *why* of the `import scipy.constants` line for posterity.

**Reflection:** Each step added a new layer of understanding for a different audience. The inline comment clarified a specific implementation detail. The docstring defined the function's public interface. The README provided a user-level entry point. The ADR explained a foundational project decision.

## Diagrams
This diagram shows the scope and audience of each documentation type, from the most local to the most global.

```text
      ^ Scope & Audience (Project/Team-wide)
      |
  [ ADRs ]  <-- Architects, Future Maintainers (Why we chose this path)
      |
 [ README ] <-- New Users, New Developers (How to start)
      |
[ Docstrings ] <-- Developers using your code (The API contract)
      |
[Inline Comments] <-- Developers reading your code (Why this line is tricky)
      |
+--------------------------------------------------> Granularity (Line -> Function -> Project)
```

## Memory technique — remember this forever
1.  **Mnemonic:** "The Four Layers of an Onion": From the outside in, you encounter documentation that takes you deeper into the code's core.
    - **README:** The dry, outer skin. Tells you what it is and how to peel it.
    - **Docstrings:** The first fleshy layer. The public interface you can use without seeing the center.
    - **Inline Comments:** The veins within the layers. Guide you through the internal structure.
    - **ADRs:** The core from which it grew. The foundational decisions that shaped it.

2.  **Facts to overlearn:**
    - **Inline Comment:** Explains the *why* of a tricky line/block. Audience: code maintainer.
    - **Docstring:** Defines the API contract (inputs, outputs, errors). Audience: code user.
    - **README:** Project entry point (purpose, install, usage). Audience: new user/developer.
    - **ADR:** Records the rationale for a significant architectural choice. Audience: future architect.

3.  **Spaced-repetition schedule:** Review these concepts in 1 day, 3 days, 7 days, 16 days, and 35 days. Each time, try to regenerate the "Onion" mnemonic and the four facts from memory before checking.

4.  **First principles pathway:** If you forget, start from the audience. Who needs to understand your code, and what questions will they have?
    - "I'm using your function. What do I pass in?" -> Need for **Docstrings**.
    - "I'm a new developer. What does this whole project do?" -> Need for **README**.
    - "I'm debugging this line. Why is it written in this weird way?" -> Need for **Inline Comments**.
    - "I'm the new tech lead. Why on earth did we choose this database two years ago?" -> Need for **ADRs**.

## Common mistakes
1.  **Parroting the Code:** Writing comments that just state what the code does. `// loop over the array` is useless. `// loop backwards to safely delete elements during iteration` is useful.
2.  **Doc Rot:** Updating the code but not the corresponding documentation. Out-of-date documentation is actively harmful because it misleads the reader. Treat documentation as part of the code; when code changes, the docs must change with it.
3.  **Assuming Context:** Writing a README that starts with "Just run the build script." It should assume the user has just cloned the repository and knows nothing else. Specify the language version, dependencies, and exact commands.
4.  **Hiding the "Why":** Making a critical design choice (e.g., choosing a specific algorithm for performance reasons) and not documenting that rationale anywhere. When someone later tries to "simplify" the code, they will break the implicit performance contract.

## Self-check
1.  Take a function of 5-10 lines you have written. Add one inline comment and a complete docstring. Does the docstring fully describe the contract without forcing the user to read the code?
2.  Your colleague has written a Python script that automates a data processing task for a physics experiment. It has no documentation. Write the complete `README.md` file for it, inventing reasonable assumptions about how it's installed and run.
3.  You are building a simulation of a planetary system. You must choose between a simple Euler integrator and a more complex but accurate Runge-Kutta 4th order (RK4) integrator. The Euler method is much faster to code and run, but RK4 is more stable for long-term simulations. Write an ADR that documents your decision to use the RK4 integrator.