## What it is
Software testing is the process of evaluating a software item to detect differences between given input and expected output. The different types of testing—unit, integration, system, acceptance, smoke, and regression—are not mutually exclusive methods but rather labels for testing at different levels of scope and for different purposes, from verifying a single function to confirming the entire application meets business requirements.

## Why it matters
In high-stakes fields, robust testing is non-negotiable. The 1996 Ariane 5 rocket failure was caused by an integer overflow in a reused, but inadequately tested, software module—a failure that a proper system test should have caught. In physics simulations, unit tests must verify the correctness of numerical integrators ($F=ma \rightarrow \Delta v = \frac{F}{m}\Delta t$), while system tests verify that the entire simulation conserves energy over millions of time steps. In machine learning, unit tests check data transformation functions, while acceptance tests confirm the model's predictive accuracy meets the client's threshold.

## When to study it
Before tackling this, you must have a solid grasp of basic programming concepts, particularly functions, classes, and modules (or equivalent component structures). You should also understand the high-level software development lifecycle: the journey from a requirement to a piece of working code. Without this context, the different levels of testing will seem arbitrary.

## How to study it (step by step)
1.  **Code a simple system.** Create two Python classes: `Thruster` with a method `set_throttle(percentage: float) -> force_newtons: float` and `GuidanceComputer` with a method `calculate_burn(current_velocity, target_velocity)` that uses a `Thruster` object. Keep it simple; the logic can be trivial.
2.  **Write a unit test.** Using a framework like `pytest`, write a test for *only* the `Thruster` class. Assert that `thruster.set_throttle(0.5)` returns the expected force. Notice you don't need the `GuidanceComputer` at all. This is testing in isolation.
3.  **Write another unit test.** Now, test *only* the `GuidanceComputer`. To isolate it from the real `Thruster`, use a "mock" object. Your test will create a fake `Thruster` that you control, allowing you to verify that `calculate_burn` calls `thruster.set_throttle` with the correct percentage.
4.  **Write an integration test.** Write a new test that uses a *real* `GuidanceComputer` and a *real* `Thruster`. Instantiate both and call the `calculate_burn` method. Assert that the state of the *thruster object* is correctly updated. You are now testing the "seam" between the two components.
5.  **Write a system test.** Imagine your code is part of a command-line application `launch.py` that takes a target velocity and prints the required burn time. A system test would execute `python launch.py --target-velocity 1000` and check that the program's `stdout` contains the expected output. This tests the entire integrated system from the user's perspective.
6.  **Simulate a regression.** Change the `Thruster` class to use kilopascals instead of percentages for throttle. Your unit test for `Thruster` will fail. Fix it. Now, re-run your integration and system tests. They will also fail. This demonstrates a *regression*—a change that broke existing functionality. The suite of tests you built caught it.

## Key ideas, with intuition
1.  **The Testing Pyramid:** The most effective testing strategies are bottom-heavy. You should have many fast, simple unit tests; a smaller number of more complex integration tests; and very few slow, end-to-end system tests. This structure ensures that bugs are caught as early and cheaply as possible.
2.  **Scope and Isolation are Everything:** The primary distinction between test types is scope. A unit test proves a function $f(x)$ works. An integration test proves that $g(f(x))$ works, assuming you already know $f(x)$ and $g(y)$ work individually. A system test proves the entire application, which might be represented as $h(g(f(x)))$, works from start to finish.
    $$ \text{Unit} \subset \text{Integration} \subset \text{System} $$
3.  **Verification vs. Validation:**
    *   **Verification** asks: "Are we building the product right?" Unit, integration, and system tests are primarily for verification. They check the code against the technical design and specifications.
    *   **Validation** asks: "Are we building the right product?" **Acceptance Testing** is for validation. It's often performed by the user or client (User Acceptance Testing or UAT) to confirm the software meets their actual needs and requirements.
4.  **Specialized Test Purposes:**
    *   **Smoke Test:** A small, rapid subset of tests run on a new build to see if it's stable enough for further testing. If the build is "on fire," the smoke test fails, and the build is immediately rejected.
    *   **Regression Test:** A suite of existing tests re-run after a code change to ensure the change hasn't broken previously working functionality. Its purpose is to prevent "regressions," or backward steps in quality.

## Worked example
Let's test a simple physics function for kinetic energy, $K = \frac{1}{2}mv^2$.

**Code to be tested (in `physics.py`):**
```python
def calculate_kinetic_energy(mass_kg: float, velocity_ms: float) -> float:
    if mass_kg < 0:
        raise ValueError("Mass cannot be negative.")
    return 0.5 * mass_kg * velocity_ms**2

def get_energy_report(body_name: str, mass_kg: float, velocity_ms: float) -> str:
    energy = calculate_kinetic_energy(mass_kg, velocity_ms)
    return f"Report for {body_name}: Kinetic Energy = {energy:.2f} J"
```

**Step 1: Write Unit Tests for `calculate_kinetic_energy`**
We test this function in complete isolation.
```python
# test_physics.py
from physics import calculate_kinetic_energy
import pytest

def test_KE_with_positive_values():
    # Test a standard case
    assert calculate_kinetic_energy(mass_kg=10, velocity_ms=4) == 80.0

def test_KE_with_zero_velocity():
    # Test an edge case
    assert calculate_kinetic_energy(mass_kg=10, velocity_ms=0) == 0.0

def test_KE_with_negative_mass():
    # Test for expected error handling
    with pytest.raises(ValueError):
        calculate_kinetic_energy(mass_kg=-5, velocity_ms=10)
```
*Reflection:* These tests verify the core logic (`0.5*m*v^2`), an edge case (`v=0`), and the error handling (`m<0`) of a single, isolated function. They are fast and precise.

**Step 2: Write an Integration Test for `get_energy_report`**
This test verifies that `get_energy_report` correctly calls `calculate_kinetic_energy` and formats the result.
```python
# test_physics.py
from physics import get_energy_report

def test_energy_report_integration():
    # Test the interaction between formatting and calculation
    report = get_energy_report(body_name="Satellite", mass_kg=10, velocity_ms=4)
    assert report == "Report for Satellite: Kinetic Energy = 80.00 J"
```
*Reflection:* This test is not concerned with the internal logic of the kinetic energy calculation (the unit tests already covered that). It is concerned with the *integration* of that calculation into the report string. It verifies the "glue" between the two parts works correctly.

## Diagrams
The V-Model of testing shows how test phases correspond to development phases.

```text
       Development Phases             Testing Phases
       (Verification)                 (Validation)
       ----------------             ----------------
       Requirements Spec  --------->  Acceptance Testing
            \                          /
             \                        /
      High-Level Design  --------->  System Testing
               \                    /
                \                  /
       Low-Level Design  ------->  Integration Testing
                  \                /
                   \              /
                     ---> Code <---
                           ^
                           |
                      Unit Testing
```

This diagram shows the scope of different tests. Unit tests are the smallest and most numerous, forming the foundation.

```text
+---------------------------------------------------+
| System Testing (End-to-end user scenarios)        |
|                                                   |
|  +---------------------------------------------+  |
|  | Integration Testing (Modules interacting)   |  |
|  |                                             |  |
|  |  +---------------------------------------+  |  |
|  |  | Unit Testing (A single function/class)|  |  |
|  |  +---------------------------------------+  |  |
|  |                                             |  |
|  +---------------------------------------------+  |
|                                                   |
+---------------------------------------------------+
```

## Memory technique — remember this forever
1.  **The Story:** "Building a Car"
    *   **Unit Test:** You test the spark plug by itself to see if it sparks.
    *   **Integration Test:** You install the spark plug in the engine and test if the cylinder fires correctly.
    *   **System Test:** You take the fully assembled car for a test drive on a track.
    *   **Acceptance Test:** The customer drives the car and says, "Yes, this meets my needs."
    *   **Regression Test:** After swapping the radio for a new model, you take the car for the *same* test drive to make sure you didn't accidentally disconnect the speedometer.
    *   **Smoke Test:** You turn the key to see if the engine starts at all before beginning the full test drive.

2.  **Must Overlearn:**
    *   **Unit Test:** Tests one component in *isolation*.
    *   **Integration Test:** Tests the *interface* between two or more components.
    *   **System Test:** Tests the complete, integrated system against the requirements.

3.  **Spaced Repetition Schedule:** Review these concepts at:
    *   1 day: Re-read this lesson.
    *   3 days: Write a new unit and integration test for a small program you've written.
    *   7 days: Explain the "Building a Car" analogy to a friend.
    *   16 days: Diagram the V-Model from memory.
    *   35 days: Answer the self-check questions again.

4.  **First Principles Pathway:** If you forget the terms, reason from the code outward.
    *   What's the smallest piece of code I can run? A function. How do I test it? **(Unit)**
    *   My functions call each other. How do I test the connections? **(Integration)**
    *   My whole program runs. How do I test it from start to finish like a user would? **(System)**
    *   Does the user agree that it's finished? **(Acceptance)**
    *   I just changed something. How do I make sure I didn't break anything old? **(Regression)**

## Common mistakes
1.  **Writing integration tests and calling them unit tests.** A common mistake is for a "unit test" to make a network call or hit a database. If a test depends on another system component to run, it's an integration test. True unit tests use mocks or stubs to isolate the code under test.
2.  **The Inverted Pyramid (or "Ice Cream Cone").** Relying heavily on slow, brittle system tests and having few or no unit tests. This makes debugging extremely difficult because a failure in a system test could originate from any of the dozens of components it uses.
3.  **Testing implementation details.** Writing tests that check a private method was called or that a loop ran exactly 5 times. Good tests check the *observable behavior* (the "what"), not the implementation (the "how"). This makes your code hard to refactor because changing the implementation breaks the tests, even if the behavior is still correct.
4.  **Forgetting regression testing.** A developer makes a "safe" change in a core library, doesn't re-run the full test suite, and breaks a seemingly unrelated feature. Always run the relevant regression tests.

## Self-check
1.  You have a web application with a `hash_password(password)` function and a `register_user(username, password)` function that calls it and saves the result to a database. Describe the unit test for `hash_password` and the integration test for `register_user`.
2.  You are tasked with testing a Mars rover's navigation software. The software has modules for image processing (to identify rocks), pathfinding (to plot a course around them), and motor control. Describe one critical integration test and one critical system test for this rover.
3.  A team adds a caching layer to their database access module to improve performance. They write unit tests verifying that the cache stores and retrieves data correctly. Upon deployment, users report seeing stale data. What level of testing was likely insufficient, and what specific test case would have caught this bug before release?