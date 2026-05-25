## What it is
A **class** in C++ is a user-defined blueprint for creating objects. It bundles data, called **member variables**, and functions that operate on that data, called **member functions**, into a single unit. **Access specifiers** (`public`, `private`, `protected`) are keywords that define the visibility and accessibility of these members from outside the class.

## Why it matters
This is the foundation of Object-Oriented Programming (OOP), a dominant paradigm in large-scale software. In aerospace guidance systems, a `StateVector` class can encapsulate a rocket's position and velocity, with public methods to update its state according to physics equations (`propagate_state()`) but private data to prevent accidental corruption. In machine learning, a `NeuralNetwork` class can hide the complex internal weights (`private`) and expose a simple `predict()` interface (`public`), ensuring the model is used correctly.

## When to study it
You must be comfortable with fundamental C++ concepts before tackling classes. Specifically, you need to understand:
- Basic syntax: variables, data types (int, double, etc.), and operators.
- Control flow: `if`, `for`, `while`.
- Functions: declaration, definition, parameters, and return values.
- `struct`: How to define a `struct` and access its members. A class is essentially a `struct` with more powerful access control. If you are not solid on `struct`, review it first.

## How to study it (step by step)
1.  **From `struct` to `class`:** Write a simple `struct` to represent a 2D point with `double x` and `double y`. In `main()`, create an instance and directly modify its members. Now, change the keyword `struct` to `class` and try to compile. Observe the error; this is because class members are `private` by default.
2.  **Introduce `public`:** Fix the error from step 1 by adding the `public:` specifier before the member variables. Understand that you've now replicated the behavior of a `struct`.
3.  **Encapsulate the data:** Move the member variables under a `private:` specifier. Write a `public:` member function, e.g., `void print_coords() const;`, inside the class definition. Implement this function to print the coordinates. In `main()`, call this member function on your object.
4.  **Create an interface:** Write public "setter" and "getter" functions. For example, `void set_coords(double new_x, double new_y);` and `double get_x() const;`. Use these in `main()` to interact with the object's private data. This is the core pattern of encapsulation.
5.  **Implement a method with logic:** Add a member function `double distance_from(const Point& other) const;`. This function will take another `Point` object as an argument and calculate the Euclidean distance. This demonstrates how member functions can operate on the object's own data and interact with other objects of the same type.
6.  **Conceptualize `protected`:** Read about `protected`. You won't use it yet, as it only becomes relevant with inheritance. For now, understand it as a middle ground: accessible to the class itself and any "child" classes derived from it, but not to the general public.

## Key ideas, with intuition
1.  **Encapsulation: The Black Box Principle.** A class bundles data and the functions that manipulate it. The goal is to hide the internal complexity (`private` members) and expose a simple, stable interface (`public` members). Think of a calculator: you use the public interface (the buttons) without needing to know about the private implementation (the internal circuits). This prevents you from accidentally breaking the internal state.

2.  **Interface vs. Implementation.** The `public` section is the *contract* or *interface* the class promises to the outside world. The `private` section is the *implementation detail*. This separation is powerful: you can completely refactor the private implementation (e.g., change from Cartesian to polar coordinates internally) without breaking any external code, as long as the public interface remains the same.

3.  **Access Specifiers as concentric walls of a castle.**
    *   `private`: The king's chambers. Only the class itself (the king) can access these members. This is the default for classes and offers the highest level of protection.
    *   `protected`: The royal court. Accessible by the class itself and its descendants (derived classes, the royal family). Inaccessible to the general public.
    *   `public`: The castle gates. Accessible by anyone. This is the intended way for external code to interact with your object.

## Worked example
Let's model a simple particle for a physics simulation. It needs a mass and a 3D velocity vector. We want to be able to calculate its kinetic energy but prevent direct, uncontrolled modification of its properties.

```cpp
#include <iostream>
#include <cmath>

class Particle {
private:
    // Implementation details - hidden from the outside world.
    double mass_kg;      // in kilograms
    double vel_x, vel_y, vel_z; // in meters per second

public:
    // Interface - how the world interacts with a Particle.

    // Constructor: A special function to initialize a new object.
    Particle(double mass, double vx, double vy, double vz) {
        mass_kg = mass;
        vel_x = vx;
        vel_y = vy;
        vel_z = vz;
    }

    // Member function to calculate kinetic energy.
    // 'const' means this function does not modify the object's state.
    double kinetic_energy() const {
        // This function can access the private members of its own object.
        double speed_sq = vel_x*vel_x + vel_y*vel_y + vel_z*vel_z;
        return 0.5 * mass_kg * speed_sq;
    }

    // A "getter" to safely retrieve the mass.
    double get_mass() const {
        return mass_kg;
    }
}; // Don't forget this semicolon!

int main() {
    // Step 1: Instantiate an object of the Particle class.
    // We use the public constructor we defined.
    Particle electron(9.109e-31, 1.0e6, 2.0e6, 0.0);

    // Step 2: Use the public interface to interact with the object.
    std::cout << "Electron mass: " << electron.get_mass() << " kg" << std::endl;
    std::cout << "Electron kinetic energy: " << electron.kinetic_energy() << " J" << std::endl;

    // Step 3: Demonstrate what's forbidden. This line will NOT compile.
    // electron.mass_kg = 1.0; // ERROR: 'mass_kg' is a private member of 'Particle'
    
    return 0;
}
```

**Reflection:**
- **Step 1** worked because the constructor is `public`, allowing `main` to create a `Particle`.
- **Step 2** worked because `get_mass()` and `kinetic_energy()` are `public` methods, providing a controlled interface to the object's data and behavior.
- **Step 3** failed, which is the entire point. By making `mass_kg` `private`, we prevent external code from arbitrarily changing the particle's mass after creation, ensuring the object's state remains valid according to the rules we've defined in the class.

## Diagrams
Here is a conceptual model of a class object, showing the access specifier boundaries.

```text
+-------------------------------------------------+
|               An object of MyClass              |
|                                                 |
|  +-------------------------------------------+  |
|  |                public:                    |  | <--- Accessible from anywhere
|  |  + void do_something()                    |  |      (e.g., main())
|  |  + int get_value() const                  |  |
|  +-------------------------------------------+  |
|                                                 |
|  +-------------------------------------------+  |
|  |               protected:                  |  | <--- Accessible by MyClass and
|  |  - int helper_variable                   |  |      derived classes
|  +-------------------------------------------+  |
|                                                 |
|  +-------------------------------------------+  |
|  |                private:                   |  | <--- ONLY accessible by
|  |  - double internal_data                  |  |      MyClass's own member
|  |  - void internal_calculation()           |  |      functions
|  +-------------------------------------------+  |
|                                                 |
+-------------------------------------------------+
```

## Memory technique — remember this forever
1.  **The Car Analogy:**
    *   `public`: The driver's controls—steering wheel, pedals, ignition. Anyone with a key can use these. This is the **interface**.
    *   `private`: The engine block, the transmission internals, the ECU's firmware. You can't and shouldn't touch these directly. They are complex and critical **implementation details**. The car works because these are sealed off.
    *   `protected`: The OBD-II diagnostics port. Not for the driver, but a certified mechanic (a **derived class** in an inheritance hierarchy) can plug in their tools to access and modify deeper systems.

2.  **Must Overlearn:**
    *   Syntax: `class ClassName { public: /* members */ private: /* members */ };`
    *   Default access for `class` is `private`.
    *   Default access for `struct` is `public`.

3.  **Spaced Repetition Schedule:** Review this material and your own practice code at **1 day, 3 days, 7 days, 16 days, and 35 days**.

4.  **First Principles Pathway:** If you forget everything, start here: We need to group related data together. A `struct` does this. But what if some data is critical and shouldn't be changed randomly? We need rules to control access. This leads to the idea of "public" (anyone can access) vs. "private" (only functions defined within the group can access). The `class` keyword is just the C++ syntax for this concept of a `struct` with access rules.

## Common mistakes
1.  **Forgetting the semicolon:** Every class definition must end with a semicolon: `class MyClass { ... };` This is a common and frustrating syntax error.
2.  **The "All Public" anti-pattern:** Making all members `public` because it's easier to access them. This completely defeats the purpose of encapsulation and is equivalent to just using a `struct`. It's a sign of a weak design.
3.  **Accessing private members from `main()`:** Trying to do `myObject.private_variable = 10;` from outside the class. The compiler will stop you. The fix is to use a public "setter" method if that access is truly needed.
4.  **Defining a function but forgetting the class scope:** When implementing a member function outside the class definition, forgetting to prefix it with the class name and scope resolution operator: `void MyClass::my_function() { ... }`. Without `MyClass::`, it's just a regular global function.

## Self-check
1.  Take a `struct` that represents a bank account with a `std::string owner_name` and a `double balance`. Rewrite it as a `class Account` with appropriate access specifiers for the member variables.
2.  Add a `public` member function `bool withdraw(double amount);` to your `Account` class. This function should only subtract the `amount` from the `balance` if the `amount` is positive and does not exceed the current balance. It should return `true` for a successful transaction and `false` otherwise.
3.  Explain a scenario where `protected` would be the correct access specifier to use, while `private` would be too restrictive and `public` would be too permissive. You may need to sketch out a hypothetical example involving a `BankAccount` base class and a `SavingsAccount` derived class.