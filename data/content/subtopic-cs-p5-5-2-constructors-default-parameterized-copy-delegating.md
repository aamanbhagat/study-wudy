## What it is
A constructor is a special member function in C++ that is automatically called when an object of a class is created. Its primary job is to initialize the object's member variables, ensuring the object starts in a valid and predictable state. Different types of constructors allow for different ways of creating objects: with default values, with specific initial values, or as a copy of an existing object.

## Why it matters
In scientific computing, objects must be in a consistent state from the moment they exist. A `Particle` object in a physics simulation cannot have an uninitialized mass or position; a `Matrix` object in a linear algebra library must have its dimensions and memory allocated correctly upon creation. Constructors enforce this discipline, preventing a huge class of bugs related to uninitialized data that are notoriously difficult to track down in complex simulations or control systems.

## When to study it
You must understand the following concepts before tackling constructors:
*   **Classes and Objects:** The distinction between a class (a blueprint) and an object (an instance of that blueprint).
*   **Member Variables and Member Functions:** The data and behaviors that belong to a class.
*   **Function Overloading:** The concept of having multiple functions with the same name but different parameter lists. Constructors are a specialized form of this.

If you are not solid on these, review them first. Otherwise, you are ready.

## How to study it (step by step)
1.  **Observe the Implicit Default:** Write a simple class `Vector2D` with `double x, y;` members. Do not define any constructor. In `main()`, create an instance `Vector2D v;`. Print the values of `v.x` and `v.y`. Notice they are uninitialized (garbage values). This demonstrates what happens without an explicit constructor.
2.  **Implement the Explicit Default Constructor:** Add a public member function `Vector2D() : x(0.0), y(0.0) {}`. This is a default constructor that initializes `x` and `y` to zero. Re-run your `main` function. Observe that the object is now created in a known state.
3.  **Add a Parameterized Constructor:** Add a second constructor: `Vector2D(double x_val, double y_val) : x(x_val), y(y_val) {}`. Now, try to create an object using the default constructor again: `Vector2D v;`. Your code will fail to compile. Internalize why: defining *any* constructor tells the compiler not to generate the default one for you anymore.
4.  **Implement the Copy Constructor:** Add a third constructor: `Vector2D(const Vector2D& other) : x(other.x), y(other.y) {}`. Write a function `void print_vector(Vector2D v)` that takes its argument by value. In `main`, create a vector `Vector2D v1(3, 4);` and call `print_vector(v1);`. Use a debugger or print statements inside the copy constructor to see that it is called when `v1` is passed to the function.
5.  **Refactor with a Delegating Constructor:** Your default and parameterized constructors have overlapping logic. Refactor the default constructor to call the parameterized one: `Vector2D() : Vector2D(0.0, 0.0) {}`. This is a delegating constructor. It reduces code duplication and centralizes initialization logic.

## Key ideas, with intuition
1.  **Initialization is not Assignment:** A constructor's most important feature is the *member initializer list*, the part that comes after the colon `:` and before the function body `{}`.
    $$
    \text{ClassName}(\text{params}) : \text{member1}(\text{val1}), \text{member2}(\text{val2}) \{ /* \text{body} */ \}
    $$
    This *initializes* the members. Writing `member1 = val1;` inside the body is *assignment*. Initialization happens first and is more efficient. For `const` or reference members, initialization is the *only* way. Think of initialization as building the foundation correctly, while assignment is remodeling an already-built room.

2.  **The Compiler Is a Lazy but Helpful Assistant:** If you write no constructors at all, the compiler generates a public default constructor and a copy constructor for you. They perform member-wise initialization. However, the moment you define *any* constructor (e.g., a parameterized one), the compiler assumes you want full control and will *not* generate the default constructor. This is a common source of errors.

3.  **Overload Resolution Selects the Blueprint:** The way you declare your object variable is a direct instruction to the compiler about which constructor to use. This is just function overload resolution.
    *   `Vector2D v1;` $\rightarrow$ Matches `Vector2D()`. Calls the default constructor.
    *   `Vector2D v2(3.0, 4.0);` $\rightarrow$ Matches `Vector2D(double, double)`. Calls the parameterized constructor.
    *   `Vector2D v3 = v2;` or `Vector2D v3(v2);` $\rightarrow$ Matches `Vector2D(const Vector2D&)`. Calls the copy constructor.

4.  **Delegation is DRY (Don't Repeat Yourself):** Often, one constructor is a specialized version of another. For example, a default constructor might just be a parameterized constructor with all-zero arguments. A delegating constructor lets one constructor call another in the member initializer list, centralizing the core initialization logic in one place.

## Worked example
Let's model a `Particle` for a physics simulation.

```cpp
#include <iostream>
#include <cmath>

class Particle {
public:
    // 1. Parameterized constructor (the most general one)
    Particle(double m, double x, double y, double z)
        : mass(m), pos_x(x), pos_y(y), pos_z(z) {
        std::cout << "Parameterized constructor called for particle at ("
                  << pos_x << ", " << pos_y << ", " << pos_z << ")\n";
    }

    // 2. Delegating constructor for a particle at the origin
    Particle(double m) : Particle(m, 0.0, 0.0, 0.0) {
        std::cout << "Delegating constructor called for particle at origin\n";
    }

    // 3. Default constructor (delegates to the origin constructor)
    // Creates a standard 1kg test mass at the origin.
    Particle() : Particle(1.0) {
        std::cout << "Default constructor called\n";
    }

    // 4. Copy constructor
    Particle(const Particle& other)
        : mass(other.mass), pos_x(other.pos_x), pos_y(other.pos_y), pos_z(other.pos_z) {
        std::cout << "Copy constructor called.\n";
    }

    void print() const {
        std::cout << "Particle(mass=" << mass << ", pos=(" << pos_x << ", "
                  << pos_y << ", " << pos_z << "))\n";
    }

private:
    double mass;
    double pos_x, pos_y, pos_z;
};

// A function that takes a Particle by value to trigger the copy constructor
void analyze_particle(Particle p) {
    std::cout << "Analyzing a copy of a particle.\n";
    p.print();
}

int main() {
    std::cout << "--- Creating p1 (default) ---\n";
    Particle p1; // Calls default -> delegating -> parameterized
    p1.print();

    std::cout << "\n--- Creating p2 (parameterized) ---\n";
    Particle p2(10.0, 1.0, 2.0, 3.0); // Calls parameterized directly
    p2.print();

    std::cout << "\n--- Creating p3 (copy) ---\n";
    Particle p3 = p2; // Calls copy constructor
    p3.print();

    std::cout << "\n--- Passing p2 to function by value ---\n";
    analyze_particle(p2); // Calls copy constructor for the function parameter

    return 0;
}
```

**Reflection:**
*   **Step 1:** The parameterized constructor is the workhorse. It uses a member initializer list for efficient and correct initialization.
*   **Step 2 & 3:** The other constructors don't repeat the initialization logic. They *delegate* to a more general constructor, keeping the code clean and maintainable. Notice the chain: `Particle()` calls `Particle(1.0)`, which in turn calls `Particle(1.0, 0.0, 0.0, 0.0)`.
*   **Step 4:** The copy constructor is explicitly defined. It's invoked both during direct initialization (`Particle p3 = p2;`) and when passing an object by value, which is a crucial behavior to understand.

## Diagrams
Here is a diagram showing the state of an object's memory before and after a constructor runs.

```text
Object `p` of type `Particle` in memory

Before constructor call:
+--------------------------------+
|          Memory for p          |
|--------------------------------|
| mass:   [? garbage bytes ?]    |
| pos_x:  [? garbage bytes ?]    |
| pos_y:  [? garbage bytes ?]    |
| pos_z:  [? garbage bytes ?]    |
+--------------------------------+

After `Particle p(10.0, 1, 2, 3);` call:
+--------------------------------+
|          Memory for p          |
|--------------------------------|
| mass:   [double value 10.0]    |
| pos_x:  [double value 1.0]     |
| pos_y:  [double value 2.0]     |
| pos_z:  [double value 3.0]     |
+--------------------------------+
      ^
      |
      Constructor's job is to fill this allocated
      memory with meaningful initial values.
```

And a flow diagram for constructor selection:

```text
Start: You write `MyClass obj(args...);`
       or `MyClass obj;` or `MyClass obj = other;`
         |
         v
[ Compiler examines `(args...)` ]
         |
         +------------------+------------------+------------------+
         |                  |                  |                  |
         v                  v                  v                  v
 Is it empty?        Are args `(v1, v2)`?   Is arg `(other)`?   ...and so on...
 `MyClass obj;`      `obj(3.0, 4.0)`       `obj(other_obj)`
         |                  |                  |
         v                  v                  v
[ Search for match ] [ Search for match ] [ Search for match ]
`MyClass()`         `MyClass(double, double)` `MyClass(const MyClass&)`
         |                  |                  |
         v                  v                  v
[ Call Default Ctor ] [ Call Param. Ctor ] [ Call Copy Ctor ]
         |
         v
      [ Error if no match found ]
```

## Memory technique — remember this forever
1.  **Mnemonic Story:** Think of creating an object as ordering a custom rocket from a factory.
    *   **Default Constructor:** The "Standard Model" off the assembly line. `Rocket r1;`
    *   **Parameterized Constructor:** The "Custom Order" where you specify the engine thrust and fuel capacity. `Rocket r2(9.1e6, 1.7e5);`
    *   **Copy Constructor:** The "Clone Order." You point to an existing rocket and say "make me one just like that." `Rocket r3 = r2;`
    *   **Delegating Constructor:** The factory's internal efficiency. The instructions for the "Standard Model" just say: "Follow the 'Custom Order' instructions with engine=X and fuel=Y."

2.  **Must Overlearn:**
    *   **Member Initializer List Syntax:** `ClassName(args) : member1(val1), member2(val2) {}`
    *   **Copy Constructor Signature:** `ClassName(const ClassName& other)` (The `const` and `&` are not optional.)
    *   **The Compiler Rule:** Defining *any* constructor stops the compiler from generating the default constructor `ClassName()`.

3.  **Spaced Repetition Schedule:** Review this material and your own code examples in **1 day, 3 days, 7 days, 16 days, and 35 days**. Actively rewrite the code from memory each time.

4.  **First Principles Pathway:** If you forget the details, start from this question: "An object is just a block of memory. How do the member variables inside that block get their initial, valid values?" The answer is the constructor. The different types of constructors are just different answers to "Where do those initial values come from?" (Nowhere specific/defaults, from arguments, or from another object).

## Common mistakes
1.  **Assignment in Body vs. Initialization in List:** Writing `mass = m;` inside the constructor body `{}` instead of ` : mass(m)`. This is less efficient and will fail for `const` members. Always prefer the member initializer list.
2.  **Forgetting the Default:** You write a parameterized constructor `MyClass(int x)`, then later try to create a default object `MyClass obj;`. This fails because the compiler no longer provides the default constructor. You must define it yourself if you need it.
3.  **The Most Vexing Parse:** Writing `MyClass obj();` instead of `MyClass obj;`. The first one declares a function named `obj` that returns a `MyClass` object and takes no arguments. The second correctly declares an object `obj` using the default constructor.
4.  **Recursive Copy Constructor:** Defining a copy constructor that takes its argument by value: `MyClass(MyClass other)`. To pass the argument, the compiler needs to make a copy, which calls the copy constructor, which needs to make a copy... leading to infinite recursion and a stack overflow. It *must* be a reference: `MyClass(const MyClass& other)`.

## Self-check
1.  Create a class `ComplexNumber` with `double real` and `double imag` members. Implement a default constructor that initializes a number to $0 + 0i$ and a parameterized constructor that initializes it to $a + bi$ given `a` and `b`.
2.  Add a copy constructor to your `ComplexNumber` class. Write a `main` function and a separate function `ComplexNumber conjugate(const ComplexNumber c)` that returns the complex conjugate. Verify (e.g., with print statements) that the copy constructor is not called inside the `conjugate` function (due to pass-by-const-reference) but may be called on the return.
3.  Create a class `Satellite`. Its members should be `mass` (a `double`), `id` (an `int`), and `orbiting_body` (a `std::string`). Write a single parameterized constructor that takes all three values. Then, write two delegating constructors: one for "Earth" satellites that only takes mass and ID, and a default constructor for a "Default Test Satellite" (100kg, ID -1, orbiting Earth).