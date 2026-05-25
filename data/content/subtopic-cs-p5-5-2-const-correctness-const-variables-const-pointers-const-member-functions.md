## What it is
`const` correctness is a feature of the C++ type system that allows you to declare variables, pointers, and member functions as unchangeable. It is a contract you make with the compiler, promising not to modify a piece of data. The compiler then enforces this promise, generating an error if you attempt to violate the contract.

## Why it matters
In complex systems like flight control software or physics simulations, `const` prevents catastrophic bugs by guaranteeing that critical parameters (e.g., gravitational constants, rocket motor thrust curves) are not accidentally altered during execution. It also serves as documentation; when you see a function signature like `void process_data(const SensorReading& data)`, you know immediately that the function will read from `data` but not modify it. This makes large codebases safer, more readable, and easier to reason about.

## When to study it
You must have a solid grasp of these C++ fundamentals before tackling `const` correctness:
-   **Variables and Data Types:** `int`, `double`, etc.
-   **Pointers:** Declaration (`T*`), dereferencing (`*ptr`), and address-of (`&var`).
-   **References:** Declaration (`T&`) and usage, particularly in function arguments.
-   **Classes and Objects:** Member variables, member functions, and the concept of the implicit `this` pointer.

If you are not confident with pointers and the `this` pointer, pause and review them first.

## How to study it (step by step)
1.  **`const` variables:** In your IDE, declare a `const` variable: `const double G = 6.67430e-11;`. Now, on the next line, try to change it: `G = 9.81;`. Compile the code and analyze the exact error message your compiler produces. Understand that this is the fundamental contract in action.
2.  **Pointer to `const` data:** Declare an integer `int x = 10;` and a pointer to a constant integer pointing to it: `const int* p = &x;`. Now, try to modify the data through the pointer: `*p = 20;`. Observe the compiler error. Then, change what the pointer points to: `int y = 30; p = &y;`. Observe that this compiles successfully. Internalize: the *data* is protected, not the pointer.
3.  **`const` pointer:** Declare `int x = 10;` and a constant pointer: `int* const p = &x;`. Now, modify the data it points to: `*p = 20;`. Observe that this works. Then, try to change the pointer itself: `int y = 30; p = &y;`. Observe the compiler error. Internalize: the *pointer* is protected, not the data.
4.  **`const` pointer to `const` data:** Combine the two. Declare `int x = 10;` and `const int* const p = &x;`. Try to modify the data (`*p = 20;`) and the pointer (`p = &y;`). Verify that the compiler rejects both attempts.
5.  **`const` member functions:** Define a simple class like `Vector2D` with `double x, y;`. Write a `double magnitude() { return sqrt(x*x + y*y); }`. Now, create a `const` object: `const Vector2D v{3.0, 4.0};`. Try to call `v.magnitude();`. It will fail. Add the `const` qualifier to the function signature: `double magnitude() const { ... }`. Recompile and see that it now works. This demonstrates that `const` objects can only call `const` member functions.

## Key ideas, with intuition
1.  **`const` is a promise about what won't be modified.** It's a compile-time check, not a runtime one. This means it catches errors before your program even runs, which is the best time to find them.
2.  **The "Right-to-Left" Rule for Pointers.** Read pointer declarations from right to left to understand what is `const`.
    -   `T* const p;` -> `p` is a `const` pointer to a (modifiable) `T`.
    -   `const T* p;` -> `p` is a (modifiable) pointer to a `T` that is `const`.
    -   `const T* const p;` -> `p` is a `const` pointer to a `T` that is `const`.
    Think of `const` as a keyword that modifies whatever is immediately to its left. If there's nothing to its left, it modifies what's to its right. So `const int*` is the same as `int const*`.
3.  **`const` Member Functions and the `this` Pointer.** Inside a non-`const` member function of a class `MyClass`, the compiler provides a hidden pointer `this` of type `MyClass*`. Inside a `const` member function, `this` has the type `const MyClass*`. This is how the compiler prevents a `const` function from modifying member variables: it makes the object it's operating on `const` from its own perspective.
    -   Non-`const` function: `void MyClass::do_work()` is treated as `void MyClass::do_work(MyClass* this)`.
    -   `const` function: `void MyClass::get_info() const` is treated as `void MyClass::get_info(const MyClass* this)`.

## Worked example
Let's model a satellite with a fixed mass but variable velocity. We want to calculate its kinetic energy without any risk of changing its state.

```cpp
#include <iostream>
#include <vector>

class Satellite {
public:
    // Constructor to initialize mass and velocity
    Satellite(double mass_kg, const std::vector<double>& velocity_mps)
        : m_mass_kg(mass_kg), m_velocity_mps(velocity_mps) {}

    // A non-const "setter" function to update velocity
    void set_velocity(const std::vector<double>& new_velocity_mps) {
        m_velocity_mps = new_velocity_mps;
    }

    // A const "getter" function to calculate kinetic energy.
    // It promises not to change the satellite's state.
    double kinetic_energy_joules() const {
        double speed_sq = 0.0;
        for (double component : m_velocity_mps) {
            speed_sq += component * component;
        }
        // This function cannot modify m_mass_kg or m_velocity_mps.
        // If we tried, e.g., `m_mass_kg = 0;`, it would be a compile error.
        return 0.5 * m_mass_kg * speed_sq;
    }

private:
    const double m_mass_kg; // Mass is a constant property of the satellite.
    std::vector<double> m_velocity_mps; // Velocity can change.
};

void print_energy_report(const Satellite& sat) {
    // `sat` is a const reference, so we can only call const member functions on it.
    std::cout << "Kinetic Energy: " << sat.kinetic_energy_joules() << " J\n";

    // The following line would cause a compile error because set_velocity is not const:
    // sat.set_velocity({8000.0, 0.0, 0.0});
}

int main() {
    // Step 1: Create a satellite object.
    Satellite hubble(11110.0, {7500.0, 50.0, 100.0});

    // Step 2: Pass it to a function that takes a const reference.
    // This is efficient (no copy) and safe (guaranteed not to be modified).
    print_energy_report(hubble);

    // Step 3: Modify the original object using its non-const member function.
    hubble.set_velocity({7550.0, 40.0, 90.0});

    // Step 4: Print the report again to see the new energy.
    print_energy_report(hubble);

    return 0;
}
```

**Reflection:**
-   `m_mass_kg` was declared `const` because a satellite's mass is physically constant. This prevents any function, even a non-`const` one, from changing it after construction.
-   `kinetic_energy_joules()` was declared `const` because calculating energy is a read-only operation. This allows it to be called on `const` objects, like the `sat` parameter in `print_energy_report`.
-   `print_energy_report` takes its argument by `const` reference (`const Satellite&`). This is standard practice for passing objects you only need to read from. It avoids a potentially expensive copy and provides a compile-time guarantee of safety.

## Diagrams
Here are two diagrams illustrating the key pointer types. `ptr` is the pointer variable itself (at some memory address), which holds the address of the data (`data`).

1.  **`const T* ptr` (Pointer to `const` Data)**
    The data is locked, but the pointer can be moved to point elsewhere.

    ```text
    Memory
    Address      Value        Variable Name / Description
    -----------------------------------------------------
    0x1000       0x2000       ptr (can be changed)
       |
       +---------------------> 0x2000       123          data (*ptr) (CANNOT be changed via ptr)
                             ...
                             0x3000       456          other_data
    ```
    Allowed: `ptr = &other_data;`
    Forbidden: `*ptr = 999;`

2.  **`T* const ptr` (`const` Pointer)**
    The pointer is locked to one address, but the data at that address can be changed.

    ```text
    Memory
    Address      Value        Variable Name / Description
    -----------------------------------------------------
    0x1000       0x2000       ptr (CANNOT be changed)
       |
       +---------------------> 0x2000       123          data (*ptr) (can be changed)
                             ...
                             0x3000       456          other_data
    ```
    Forbidden: `ptr = &other_data;`
    Allowed: `*ptr = 999;`

## Memory technique — remember this forever
1.  **Mnemonic:** "The `const` qualifier locks what's to its **left**."
    -   `int * const p;` (`const` is left of `p`): The pointer `p` is locked.
    -   `int const * p;` (`const` is left of `*`): The thing pointed to (`*p`) is locked.
    -   If there's nothing to the left, it locks what's to its right: `const int * p;` is the same as `int const * p;`.

2.  **Must-Overlearn Facts:**
    -   `const T* p;` // Pointer to constant data. `*p` is read-only.
    -   `T* const p;` // Constant pointer. `p` is read-only.
    -   `void func() const;` // Member function. `*this` is read-only inside `func`.

3.  **Spaced Repetition Schedule:** Review these three facts and the mnemonic at **1 day, 3 days, 7 days, 16 days, and 35 days**. Actively write them out from memory each time.

4.  **First Principles Pathway:** If you forget, remember that `const` is a type qualifier. It modifies a type to make it non-modifiable.
    -   For `const int* p`, the thing being declared is `p`. Its type is `pointer to (const int)`. So the `int` is const.
    -   For `int* const p`, the thing being declared is `p`. Its type is `const (pointer to int)`. So the pointer is const.
    -   For `void func() const;`, the `const` applies to the hidden `this` pointer, changing its type from `MyClass*` to `const MyClass*`, thus making the object's state read-only within the function.

## Common mistakes
1.  **Confusing `const T*` and `T* const`.** This is the most common error. Use the "left-rule" mnemonic until it becomes second nature.
2.  **Forgetting to mark accessor functions as `const`.** Any "getter" function that simply returns a member variable or a computed value without changing state (e.g., `getMass()`, `calculateSize()`) should be `const`. Forgetting this prevents `const` objects from using them.
3.  **Attempting to call a non-`const` function on a `const` object.** The compiler will stop you. `const Satellite s; s.set_velocity(...);` will fail because `s` is `const` and `set_velocity` is not. The fix is not to remove `const` from `s`, but to recognize that you are conceptually trying to do something impossible: modify an object you promised not to modify.
4.  **Passing by value when `const` reference would be better.** Passing large objects like `std::vector` or `std::string` by value (`void func(std::string s)`) creates an unnecessary, expensive copy. If the function doesn't need to modify the argument, always pass by `const` reference (`void func(const std::string& s)`).

## Self-check
1.  Declare a pointer named `p_accel` that is constant and points to a `double` that is also constant. Initialize it to point to a variable `gravity`.
2.  You have a class `RocketStage` with a member function `double getRemainingFuel()`. Why should this function almost certainly be declared `const`? What does this `const` declaration change about the type of the implicit `this` pointer inside the function?
3.  Consider the function signature `void simulate_trajectory(const std::vector<double>* const trajectory_data)`. Can the function clear the vector using `trajectory_data->clear()`? Can it change the pointer to point to a different vector? Explain why for each case, based on the `const` qualifiers.