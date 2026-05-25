## What it is
Templates are a C++ feature for generic programming, allowing you to write functions and classes that work with any data type. A template acts as a blueprint; the compiler uses this blueprint to generate a specific version of the function or class for each data type you use it with. This avoids code duplication while maintaining static type safety.

## Why it matters
Templates are the foundation of high-performance scientific computing libraries in C++. The Standard Template Library (STL), with containers like `std::vector`, is built on templates. In physics and rocketry, numerical simulation libraries (like Eigen for linear algebra or Boost.Odeint for differential equations) are heavily templated to allow you to run the same simulation with `float` for speed or `double` for precision without changing the core algorithm code.

## When to study it
Before tackling templates, you must have a solid grasp of these C++ fundamentals:
*   **Data Types:** Primitives (`int`, `double`, `char`) and user-defined types (`struct`, `class`).
*   **Functions:** Declaration, definition, arguments, return types, and function overloading.
*   **Classes:** Members, methods, constructors, and the distinction between class definition and object instantiation.

If you are not comfortable with all of these, pause and review them. Templates build directly upon these concepts.

## How to study it (step by step)
1.  **Identify Duplication:** Write a simple function `int max(int a, int b)`. Now, write an overloaded version `double max(double a, double b)`. Observe that the logic is identical; only the type name has changed. This is the problem templates solve.
2.  **Write Your First Function Template:** Convert the two `max` functions into a single template. Start with the line `template<typename T>` and replace every instance of `int` or `double` in your function with the placeholder `T`. Call it with both integer and double arguments and see how the compiler automatically deduces the correct type.
3.  **Identify Class Duplication:** Define a simple class `IntPair` that holds two integer members. Now, imagine you need a `DoublePair`. You would copy-paste the entire class definition.
4.  **Write Your First Class Template:** Convert `IntPair` into a class template `Pair<T>`. Add `template<typename T>` before the class definition and replace `int` with `T`.
5.  **Instantiate the Class Template:** Create objects of your `Pair` class. Unlike function templates, you must explicitly specify the type: `Pair<int> p1;` and `Pair<double> p2;`. Notice the angle bracket syntax `<...>`.
6.  **Extend to Multiple Type Parameters:** Modify your `Pair` template to hold two different types. The syntax is `template<typename T1, typename T2>`. Now you can create a `Pair<int, std::string>`. This is how `std::map` is built.

## Key ideas, with intuition
1.  **Compile-Time Code Generation:** Templates are not functions or classes themselves. They are instructions for the compiler to *generate* functions or classes. When the compiler sees `max(5.0, 10.0)`, it effectively copy-pastes your template, replaces every `T` with `double`, and compiles that new, concrete function. This is why template errors can be verbose; the error happens in the generated code, not your blueprint.
    *   **Intuition:** Think of a 3D printer G-code file (the template). It's not an object. The printer (compiler) reads the file to produce a specific plastic object (the instantiated code).

2.  **Type Deduction vs. Explicit Instantiation:**
    *   For **function templates**, the compiler is clever. It looks at the arguments you pass to deduce what `T` should be. This is *implicit instantiation*.
        $$
        \text{max}(3, 4); \quad // \text{Compiler sees two ints, deduces T = int}
        $$
    *   For **class templates**, the compiler cannot guess. You must tell it exactly what type you want to build the class for. This is *explicit instantiation*.
        $$
        \text{std::vector<double> my\_vec;} \quad // \text{We explicitly state we want a vector of doubles}
        $$

3.  **The `typename` Keyword:** In the declaration `template<typename T>`, the keyword `typename` tells the compiler that `T` is a placeholder for a type. You can also use the keyword `class` here: `template<class T>`. They are functionally identical in this context. Modern C++ favors `typename` for clarity, as `T` could be an `int` or a `float`, not just a `class`.

## Worked example
Let's create a template for a 3D vector, common in physics simulations. We want it to work with both `float` for fast graphics calculations and `double` for high-precision physics models.

**Step 1: Define the class template.**
We define a `struct Vector3` that is templated on a type `T`. It will hold three members of type `T`.

```cpp
#include <iostream>

// The template blueprint for a 3D vector
template<typename T>
struct Vector3 {
    T x, y, z;

    // A method to compute the squared magnitude.
    // We use T as the return type.
    T magnitude_squared() const {
        return x*x + y*y + z*z;
    }
};
```
**Reflection:** We used `T` for the members `x, y, z` and also for the return type of `magnitude_squared()`. This ensures that if we use `int`s, we get an `int` back, and if we use `double`s, we get a `double` back, preventing silent precision loss.

**Step 2: Instantiate the template with different types.**
In our `main` function, we will create two `Vector3` objects: one using `float` and another using `double`.

```cpp
int main() {
    // Explicit instantiation for a single-precision vector (e.g., for graphics)
    Vector3<float> v_float = {1.1f, 2.2f, 3.3f};

    // Explicit instantiation for a double-precision vector (e.g., for physics sim)
    Vector3<double> v_double = {1.1, 2.2, 3.3};

    std::cout << "Float vector magnitude^2: " << v_float.magnitude_squared() << std::endl;
    std::cout << "Double vector magnitude^2: " << v_double.magnitude_squared() << std::endl;
    
    return 0;
}
```
**Reflection:** The syntax `Vector3<float>` tells the compiler to generate a specific version of the `Vector3` struct where every `T` has been replaced by `float`. The same happens for `double`. We have written one piece of code but gotten two highly-optimized, type-safe classes from it.

## Diagrams
This diagram illustrates the compile-time nature of templates.

```text
      +-----------------------------+
      |  Your C++ Source Code       |
      |                             |
      | template<typename T>        |
      | T max(T a, T b) { ... }     | ----> The "Blueprint"
      |                             |
      | int x = max(3, 5);          |
      | double y = max(3.1, 4.2);   |
      +-----------------------------+
                   |
                   | (Compilation Process)
                   V
      +-----------------------------+
      |  C++ Compiler (e.g., g++)   | ----> The "Factory"
      +-----------------------------+
                   |
         /-------------------\
         |                   |
         V                   V
+-------------------+   +----------------------+
| Generated Code #1 |   | Generated Code #2    |
| (for int)         |   | (for double)         |
|                   |   |                      |
| int max(int a,    |   | double max(double a, |
|       int b)      |   |            double b) |
| { ... }           |   | { ... }              |
+-------------------+   +----------------------+
         |                   |
         \-------------------/
                   |
                   V
      +-----------------------------+
      |   Final Executable Program  |
      +-----------------------------+
```

## Memory technique — remember this forever
1.  **The Story: The Master Key.** A template is like a master key blank. The compiler is the locksmith. When you need to open a specific lock (e.g., a function that works on `int`s), you take the master key blank to the locksmith. The locksmith (`compiler`) cuts the key (`instantiates the template`) to fit that specific `int` lock. The result is a perfect, specialized key (`a concrete function`). You do this again for the `double` lock, getting a different, perfectly cut key from the same master blank.

2.  **Must Overlearn This Syntax:**
    *   Function Template: `template<typename T> return_type function_name(T arg);`
    *   Class Template: `template<typename T> class ClassName { T member; };`
    *   Class Instantiation: `ClassName<SpecificType> my_object;`

3.  **Spaced Repetition Schedule:** Review this material and re-implement the `Vector3` example from scratch at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days.

4.  **First Principles Pathway:** If you forget the syntax, rebuild it.
    *   Write the concrete function/class for `int`.
    *   Copy it and change `int` to `double`.
    *   Stare at the two versions. The only difference is the type name.
    *   Invent a placeholder for the type name, call it `T`.
    *   Replace all `int`/`double` with `T`.
    *   Add the magic line `template<typename T>` above it. You have just re-derived templates.

## Common mistakes
1.  **Defining template functions in a `.cpp` file.** The compiler needs to see the full template definition (the "blueprint") whenever it needs to generate a new version. If the definition is hidden in a `.cpp` file, other files that include the corresponding header only see the declaration, leading to a linker error. **The Fix:** Put your entire template definition (declaration and implementation) in the header file (`.h` or `.hpp`).
2.  **Assuming operations exist for a type `T`.** If your template code uses `a + b` on objects of type `T`, it will fail to compile if someone tries to use it with a class that hasn't overloaded `operator+`. This is a feature, not a bug—it enforces type requirements at compile time. Be mindful of the "implicit interface" your template requires.
3.  **Forgetting `typename` for nested dependent types.** When you have a template inside a template, like an iterator on a templated container (`std::vector<T>::iterator`), you sometimes need to explicitly tell the compiler that this nested item is a type. The syntax is `typename std::vector<T>::iterator it;`. If you forget `typename`, the compiler may get confused and issue a strange error.

## Self-check
1.  Write a function template `void print_array(T* arr, int size)` that prints the elements of any C-style array. Test it with an array of `int`s and an array of `char`s.
2.  Create a class template `FixedArray<T, size_t N>` that encapsulates a C-style array `T data[N];`. It should have a `size()` method that returns `N` and an `operator[]` to access elements. Why must `N` be a template parameter and not a constructor argument for this to work?
3.  Write a function template `T average(const std::vector<T>& vec)` that calculates the average of elements in a vector. What operations must the type `T` support for this template to compile and run correctly? (Think about initialization, addition, and division).