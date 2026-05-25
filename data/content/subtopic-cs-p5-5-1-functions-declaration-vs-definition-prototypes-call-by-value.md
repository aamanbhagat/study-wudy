## What it is
In C, a function is a self-contained block of code that performs a specific task. A function **declaration** (or **prototype**) tells the compiler the function's name, return type, and the types of its parameters, acting as a contract. A function **definition** provides the actual code—the implementation—that executes when the function is called.

## Why it matters
This separation is the foundation of modular programming and large-scale software. In aerospace guidance systems, a function to calculate a trajectory correction (`calculate_burn()`) can be declared in a shared header file, allowing multiple modules to use it without needing to know its complex physics implementation. This modularity is critical for verification, testing, and teamwork, as different engineers can work on different function definitions simultaneously as long as they adhere to the declared interface.

## When to study it
You must have a firm grasp of C's basic syntax and concepts before this lesson. Specifically, ensure you understand:
-   **Data Types**: `int`, `double`, `char`, `void`.
-   **Variables**: How to declare and initialize them.
-   **Control Flow**: `if`, `else`, `for`, `while`.
-   **Compilation Process**: The basic idea that the compiler reads your code from top to bottom.

If you are not comfortable with these, review them first. Otherwise, you are ready.

## How to study it (step by step)
1.  **Define-Then-Call:** Write a simple program `main.c` where you *define* a function `int add(int a, int b)` *before* the `main` function. Call it from `main` and print the result. Compile and run it to see that it works.
2.  **Introduce a Compiler Error:** Move the entire definition of `add` to be *after* the `main` function. Try to compile again. Observe the compiler warning or error (e.g., "implicit declaration of function 'add'"). Understand *why* it fails: when the compiler saw the call to `add` inside `main`, it had not yet seen the definition and didn't know what `add` was.
3.  **Fix with a Prototype:** Fix the error from step 2 by adding a function prototype (the declaration) before `main`. The prototype is just the function's header followed by a semicolon: `int add(int a, int b);`. Compile and run. It now works because you've provided the compiler with the necessary contract upfront.
4.  **Demonstrate Call by Value:** Write a new function `void attempt_modify(int x)`. Inside this function, set `x = 99;`. In `main`, declare a variable `int original = 10;`, print its value, call `attempt_modify(original)`, and then print the value of `original` again.
5.  **Analyze the Result:** Observe that the value of `original` in `main` remains `10`. This is the crucial evidence of call by value: the function `attempt_modify` received a *copy* of `original`'s value, not the variable itself.

## Key ideas, with intuition
1.  **Declaration is the "What", Definition is the "How".**
    -   Think of a blueprint for a component in a rocket engine. The **declaration** is the interface specification on the blueprint: "This part accepts a fuel line of type A, an oxidizer line of type B, and outputs thrust of type C."
    -   The **definition** is the component itself—the actual metal, valves, and combustion chamber that implements the specification.
    -   The compiler only needs the blueprint (declaration) to check if you're connecting the parts correctly. It needs the actual component (definition) later, during the linking phase, to build the final engine.

2.  **The Compiler Reads Top-to-Bottom.**
    -   A C compiler is a single-pass compiler. It reads your `.c` file from the first line to the last. If you call a function `foo()` on line 20, the compiler must have already seen either the full definition of `foo()` or at least its prototype (declaration).
    -   A prototype is a promise: "I swear, somewhere else, there will be a function that matches this signature." This promise satisfies the compiler so it can continue.
    $$
    \underbrace{\texttt{double square(double x);}}_{\text{Declaration (Prototype) - The Promise}}
    $$
    $$
    \underbrace{\texttt{double square(double x) \{ return x * x; \}}}_{\text{Definition - The Fulfillment of the Promise}}
    $$

3.  **Call by Value: The Function Gets a Photocopy.**
    -   When you pass a variable to a function, you are not giving the function the original variable. You are evaluating the variable, getting its value, and passing a *copy* of that value.
    -   Imagine a variable `v` in `main` is a piece of paper with the number 10 written on it. When you call `f(v)`, you put the paper on a photocopier, make a new sheet with "10" on it, and hand the *copy* to the function `f`. The function can scribble all over its copy, but your original paper remains untouched.

## Worked example
Let's write a program to calculate the kinetic energy, $K = \frac{1}{2}mv^2$. We'll put the calculation in a function.

```c
#include <stdio.h>

// 1. Prototype (Declaration)
// This is the "contract". It tells the compiler about kinetic_energy()
// before it is used in main(). Note the semicolon.
double kinetic_energy(double mass, double velocity);

int main(void) {
    double m = 2.0; // mass in kg
    double v = 10.0; // velocity in m/s
    
    // 2. Function Call
    // The values of m (2.0) and v (10.0) are COPIED
    // and passed to the function.
    double energy = kinetic_energy(m, v);
    
    printf("Mass: %.1f kg\n", m);
    printf("Velocity: %.1f m/s\n", v);
    printf("Kinetic Energy: %.1f Joules\n", energy);
    
    return 0;
}

// 3. Function Definition
// This is the "construction". It provides the actual implementation
// that fulfills the promise made by the prototype.
double kinetic_energy(double mass, double velocity) {
    // 'mass' and 'velocity' here are COPIES.
    // Modifying them would NOT change 'm' or 'v' in main.
    return 0.5 * mass * velocity * velocity;
}
```

**Output:**
```
Mass: 2.0 kg
Velocity: 10.0 m/s
Kinetic Energy: 100.0 Joules
```

**Reflection:**
-   **Step 1 (Prototype):** The prototype `double kinetic_energy(double mass, double velocity);` allowed `main` to call the function even though the compiler hadn't seen its definition yet. Without it, a top-to-bottom reading would yield an error.
-   **Step 2 (Call):** In `main`, the call `kinetic_energy(m, v)` passed the *values* `2.0` and `10.0`. `main`'s variables `m` and `v` were untouched.
-   **Step 3 (Definition):** The definition provided the logic. The parameters `mass` and `velocity` inside the function are new, local variables, initialized with the copied values from the call. When the function returns, these local variables are destroyed.

## Diagrams
This ASCII diagram shows the state of memory (specifically, the call stack) during the function call in the worked example.

```text
       HIGH MEMORY
      +-----------------+
      | ...             |
      +-----------------+ <--- Stack Pointer (SP) during kinetic_energy() call
      | return value    |
      | (space for 100.0) |
      +-----------------+
      | velocity = 10.0 | \
      | mass = 2.0      |  |-- `kinetic_energy` Stack Frame (Photocopies)
      +-----------------+ /
      | return address  |
      +-----------------+ <--- Stack Pointer (SP) just before the call
      | energy = ???    | \
      | v = 10.0        |  |-- `main` Stack Frame (Originals)
      | m = 2.0         | /
      +-----------------+
      | ...             |
       LOW MEMORY
```
Notice how `kinetic_energy` gets its own "stack frame" with *copies* of the values. It cannot see or access the original `m` and `v` variables in `main`'s frame.

## Memory technique — remember this forever
1.  **Mnemonic/Story:**
    -   **Declaration is the Menu:** When you go to a restaurant, the menu (declaration) tells you the name of a dish, what it contains (parameters), and what you'll get (return type). You can order from the menu without seeing the kitchen.
    -   **Definition is the Kitchen:** The kitchen (definition) is where the actual recipe is followed and the dish is made.
    -   **Call by Value is Ordering Food:** You tell the waiter "I'll have the steak." You give them the *value* from the menu. You don't give them your physical menu to take to the kitchen. The chef uses a *copy* of your order.

2.  **Must-Overlearn Facts:**
    -   Prototype syntax: `return_type function_name(type1, type2, ...);` (The semicolon is part of the syntax!)
    -   Call by value means the function operates on a **copy** of its arguments.

3.  **Spaced Repetition Schedule:**
    -   Review this entire lesson in: 1 day, 3 days, 7 days, 16 days, 35 days. Spend 5 minutes rebuilding the kinetic energy example from memory each time.

4.  **First Principles Pathway:**
    -   If you forget why prototypes are needed, simply write a C program where a function is defined *after* `main` and called from `main`. The compiler error is the first principle. The compiler reads top-down and needs to know a function's signature before it's used to verify the call is correct. The prototype provides that signature.

## Common mistakes
1.  **The Missing Semicolon:** Writing a prototype exactly like the function header but forgetting the semicolon at the end. The compiler sees this as the start of a function definition and gets confused.
    -   `int my_func(int x)` <-- WRONG (missing semicolon)
    -   `int my_func(int x);` <-- CORRECT
2.  **Prototype/Definition Mismatch:** Declaring `int func(int, double);` but defining `int func(int, int) { ... }`. The linker will fail because it cannot find the implementation for the function you promised in the prototype.
3.  **Assuming Call by Value Modifies the Original:** A very common beginner mistake is to write a `swap` function like this, expecting it to work:
    ```c
    void swap(int a, int b) {
        int temp = a;
        a = b;
        b = temp;
    } // This only swaps the local copies. The originals are unchanged.
    ```

## Self-check
1.  Write a complete C program with a function `int power(int base, int exponent)` that calculates $base^{exponent}$. Include the prototype before `main`, the definition after `main`, and a call inside `main`.
2.  Consider the following code. What will be printed to the console? Trace the value of the variable `x` in `main` step by step and explain *why* the output is what it is.
    ```c
    #include <stdio.h>
    void increment(int x);
    int main(void) {
        int x = 5;
        printf("1. x = %d\n", x);
        increment(x);
        printf("3. x = %d\n", x);
        return 0;
    }
    void increment(int x) {
        x = x + 1;
        printf("2. x = %d\n", x);
    }
    ```
3.  You are building a physics simulation. The code is split into two files: `simulation.c` (which contains `main`) and `physics.c` (which contains a function `double calculate_gravity(double mass1, double mass2)`). How would you declare, define, and call this function so that the program compiles correctly? What new type of file might you introduce to make this process clean and scalable?