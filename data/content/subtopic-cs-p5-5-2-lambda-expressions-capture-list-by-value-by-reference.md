## What it is
A lambda expression's capture list, denoted by `[...]`, specifies which variables from the enclosing scope the lambda can access. Capturing "by value" creates a copy of the variable for the lambda's use, while capturing "by reference" gives the lambda direct access to the original variable. This mechanism effectively packages a function together with the data it needs to operate on.

## Why it matters
In high-performance computing for physics simulations or rocketry guidance, you often parallelize tasks using algorithms that take functions as arguments (e.g., `std::for_each`). Lambda captures allow you to create small, on-the-fly functions that "carry" necessary state with them—like a timestep `dt` or a physical constant—into the parallel execution context without making them global variables. This is crucial for writing clean, efficient, and thread-safe code for numerical integration, data processing, or sensor fusion.

## When to study it
Before tackling this, you must have a firm grasp of C++ fundamentals. Specifically:
1.  **Variable Scope & Lifetime:** You must understand what happens to a local variable when its function returns.
2.  **Pass-by-Value vs. Pass-by-Reference:** The capture mechanism is a direct analogue of function argument passing. If `void func(int x)` vs. `void func(int& x)` is not second nature, review it first.
3.  **Basic Lambda Syntax:** You should know how to write a simple lambda like `auto f = [](){ /* ... */ };`.

If these concepts are not solid, pause and review them. The most critical prerequisite is understanding object lifetime.

## How to study it (step by step)
1.  **Compile an error:** Write a `main` function with a local variable `int x = 10;`. Write a lambda inside `main` that tries to print `x`. Do not use a capture list (`[]`). Observe the compiler error complaining that `x` is not captured.
2.  **Capture by value:** Fix the error by capturing `x` by value: `[x]`. Inside the lambda, increment `x`. Call the lambda. After the call, print the original `x` from `main`. Notice that the original `x` is unchanged. This demonstrates the copy.
3.  **Use `mutable`:** The compiler likely gave you an error in the previous step because by-value captures are `const` by default. Add the `mutable` keyword after the parameter list (`[]() mutable { ... }`) to allow modification of the *copy* of `x`. Re-run and verify the original `x` is still unaffected.
4.  **Capture by reference:** Change the capture to `[&x]`. Remove the `mutable` keyword (it's not needed for reference captures). Increment `x` inside the lambda. Call the lambda and print the original `x` again. This time, observe that the original variable has been modified.
5.  **Default captures:** Create a lambda that uses two local variables, `a` and `b`. First, use the default by-value capture `[=]` and observe the behavior. Then, change it to the default by-reference capture `[&]` and observe the difference.
6.  **Induce undefined behavior:** Write a function that creates a local variable, creates a lambda that captures it by reference, and *returns the lambda*. Call the returned lambda from `main`. Your program will likely crash or produce garbage. This demonstrates a "dangling reference," the single most dangerous aspect of reference captures.

## Key ideas, with intuition
1.  **A Lambda is a Secret Object:** The compiler transforms a lambda expression into an unnamed class type (a "functor") and creates an object of that type. The capture list defines the member variables of this secret object.
    $$
    \text{auto my_lambda = [x]() \{ std::cout << x; \};}
    $$
    This is conceptually translated by the compiler into something like:
    ```cpp
    class __Lambda_xyz {
    private:
        int x; // The captured variable is a member
    public:
        __Lambda_xyz(int x_val) : x(x_val) {} // The copy happens here
        void operator()() const {
            std::cout << x;
        }
    };
    auto my_lambda = __Lambda_xyz(x); // Create an instance
    ```

2.  **Capture by Value (`[x]`): A Photocopy.** You are giving the lambda object its own private copy of `x`. The copy is made at the moment the lambda is *created*, not when it's called. Any changes to the original `x` after the lambda's creation will not be seen by the lambda.
    *Intuition:* You're taking a snapshot of the data. Useful for thread safety and preserving state at a specific moment in time.

3.  **Capture by Reference (`[&x]`): A Direct Line.** You are giving the lambda object a reference (like a pointer) to the original `x`. The lambda reads from and writes to the actual variable in the enclosing scope.
    *Intuition:* You're creating a portal to the original variable. This is efficient as it avoids copies, but dangerous if the original variable ceases to exist before the lambda is last used.

4.  **Lifetime is Your Responsibility.** When capturing by reference, you promise the compiler that the referenced variable will live at least as long as the lambda object. If you break this promise (e.g., by returning a lambda that captures a local variable), you invoke undefined behavior. This is the root of many subtle bugs in C++.

## Worked example
Let's track the progress of a simulated rocket stage burn. We want a function that can update the fuel level.

```cpp
#include <iostream>
#include <functional>

int main() {
    double fuel_kg = 5000.0;

    // --- Capture by Value Example ---
    // This lambda gets a *copy* of fuel_kg at the time of its creation.
    // We need 'mutable' to modify this copy.
    auto simulate_burn_value = [fuel_kg]() mutable {
        fuel_kg -= 1000.0; // Modifies the lambda's internal copy
        std::cout << "  [Value Lambda] Fuel copy is now: " << fuel_kg << " kg\n";
    };

    std::cout << "Initial fuel: " << fuel_kg << " kg\n";
    
    std::cout << "Calling value-capture lambda...\n";
    simulate_burn_value();
    
    std::cout << "Fuel after value-capture call: " << fuel_kg << " kg\n\n"; // Unchanged!

    // --- Capture by Reference Example ---
    // This lambda gets a *reference* to the original fuel_kg.
    auto simulate_burn_reference = [&fuel_kg]() {
        fuel_kg -= 1000.0; // Modifies the original fuel_kg
        std::cout << "  [Ref Lambda] Original fuel is now: " << fuel_kg << " kg\n";
    };

    std::cout << "Calling reference-capture lambda...\n";
    simulate_burn_reference();

    std::cout << "Fuel after reference-capture call: " << fuel_kg << " kg\n"; // Changed!

    return 0;
}
```

**Output:**
```
Initial fuel: 5000 kg
Calling value-capture lambda...
  [Value Lambda] Fuel copy is now: 4000 kg
Fuel after value-capture call: 5000 kg

Calling reference-capture lambda...
  [Ref Lambda] Original fuel is now: 4000 kg
Fuel after reference-capture call: 4000 kg
```

**Reflection:**
-   The first lambda, `simulate_burn_value`, captured `fuel_kg` by value. When it was created, it made a private copy of `5000.0`. The `mutable` keyword allowed it to modify its *copy* to `4000.0`, but this had no effect on the original `fuel_kg` in `main`.
-   The second lambda, `simulate_burn_reference`, captured `fuel_kg` by reference. It held a direct link to the variable in `main`. When it executed `fuel_kg -= 1000.0`, it modified the original variable, which is why the final value was `4000.0`.

## Diagrams

Here is how to visualize the memory layout for the two capture types.

**Capture by Value `[x]`**
The lambda object has its own, independent copy of the data.

```text
         Enclosing Function's Stack Frame
        +---------------------------------+
        |   int x = 10;   (at address 0xA0) |
        +---------------------------------+
                         |
      (Lambda created)   |  (copy made)
                         v
        +---------------------------------+
        |  Lambda Object's Memory         |
        |  +---------------------------+  |
        |  | int x_copy = 10;          |  |  <-- A separate integer
        |  +---------------------------+  |
        +---------------------------------+
```

**Capture by Reference `[&x]`**
The lambda object holds a reference (effectively, the address) of the original variable.

```text
         Enclosing Function's Stack Frame
        +---------------------------------+
        |   int x = 10;   (at address 0xA0) |
        +---------------------------------+
                         |      ^
      (Lambda created)   |      | (operations on x_ref affect 0xA0)
                         v      |
        +---------------------------------+
        |  Lambda Object's Memory         |
        |  +---------------------------+  |
        |  | int& x_ref = (ref to 0xA0);|  |  <-- Points to original x
        |  +---------------------------+  |
        +---------------------------------+
```

## Memory technique — remember this forever
1.  **The Passport Mnemonic:** Think of the capture list `[...]` as a **passport control gate** for variables wanting to enter the lambda's self-contained world.
    -   `[x]` (by Value): You show your passport, and the guard gives you a **photocopy**. You can write on the photocopy (`mutable`), but the original passport is untouched.
    -   `[&x]` (by Reference): The guard installs a **direct video link** to your home. Anything you do is seen and felt back home immediately. If your home gets demolished (variable goes out of scope), the video link points to rubble (dangling reference).

2.  **Must-Overlearn Facts:**
    -   `[var]`: Capture by value (a copy).
    -   `[&var]`: Capture by reference (an alias).
    -   `[=]` and `[&]`: Default captures. Be explicit instead. `[=, &var]` captures `var` by reference and everything else by value.
    -   `[this]`: Captures the `this` pointer in a member function.

3.  **Spaced Repetition Schedule:**
    -   Review this lesson in: **1 day**.
    -   Then again in: **3 days**.
    -   Then again in: **7 days**.
    -   Then again in: **16 days**.
    -   Final review in: **35 days**.

4.  **First Principles Pathway:** If you forget everything, remember this: **A lambda is just syntactic sugar for a class with an `operator()`.** The capture list declares the class's member variables.
    -   `[x]` becomes a member variable `int x_member;`.
    -   `[&x]` becomes a member variable `int& x_member;`.
    -   The lifetime rules are then just the standard C++ rules for the lifetime of members and references.

## Common mistakes
1.  **Dangling References:** This is the most severe error. Capturing a local variable by reference (`[&local_var]`) and then returning the lambda from the function. The `local_var` is destroyed when the function returns, but the lambda, now outside, still holds a reference to that dead memory location.
2.  **Capturing Loop Variables by Reference Incorrectly:** In a `for` loop, if you create lambdas that capture the loop variable `i` by reference (`[&i]`), they *all* refer to the *same* variable `i`. By the time you run them after the loop, `i` will have its final value, so all lambdas will see that final value, not the value `i` had when they were created.
3.  **Accidental Expensive Copies:** Using the default by-value capture `[=]` when a large object (like a `std::vector` with millions of elements) is in scope. The lambda will create a deep copy of the entire vector, causing a massive, unexpected performance hit.
4.  **Forgetting `mutable` for By-Value Captures:** Trying to modify a variable captured by value without marking the lambda `mutable`. The compiler will stop you, as by-value captures are implicitly `const` inside the lambda's `operator()`.

## Self-check
1.  Write a lambda that calculates $y = ax + b$. `a`, `x`, and `b` are variables in the enclosing scope. The lambda should capture `a` and `b` by value, and take `x` as a formal parameter.
2.  Create a `std::vector<int> data = {1, 2, 3, 4};`. Write a function that takes an `int divisor` as an argument. Inside the function, use `std::for_each` and a lambda to divide every element in `data` by `divisor`. Which variable(s) must your lambda capture, and how should it capture them (value or reference)? Why?
3.  Write a function `make_counter()` that returns a lambda. The returned lambda, each time it is called, should return an integer that is one greater than the last time it was called (i.e., 0, 1, 2, ...). What variable needs to be captured, and what is the only way to capture it to ensure it persists between calls and the program is correct? (Hint: think about lifetime).