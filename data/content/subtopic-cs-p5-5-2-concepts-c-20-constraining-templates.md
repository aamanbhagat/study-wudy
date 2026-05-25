## What it is
C++20 Concepts are named, compile-time predicates that constrain template parameters. They allow you to specify the requirements a type must satisfy to be used with a template, such as having certain member functions, supporting specific operations, or inheriting from a particular base class. This moves template argument checking from deep within the compiler's instantiation process to the function's declaration, providing vastly clearer error messages.

## Why it matters
In scientific computing and aerospace applications, you often write generic algorithms (e.g., numerical integrators, matrix operations, physics simulators) that must operate on various data types. Concepts ensure that only types with the correct mathematical and structural properties (e.g., types that support addition and multiplication, or containers that are iterable) can be used. This prevents subtle bugs and dramatically improves code clarity and compiler error diagnostics, which is critical in high-reliability systems.

## When to study it
You must have a solid understanding of C++ templates, including function and class templates. Familiarity with basic template metaprogramming (TMP), specifically type traits like `std::is_arithmetic` or `std::is_same`, is essential. While not strictly required, having seen the pre-C++20 method of constraining templates with SFINAE (Substitution Failure Is Not An Error) and `std::enable_if` will give you a profound appreciation for why concepts are a major improvement.

## How to study it (step by step)
1.  **Experience the Pain:** Write a simple template function `add(T a, T b)` that returns `a + b`. Try to call it with a type that doesn't support `+`, like a `struct` with no overloaded operator. Study the verbose, often incomprehensible compiler error. This is the problem concepts solve.
2.  **Define a Simple Concept:** Learn the basic syntax. Define a concept `Addable` that checks if two objects of a given type can be added together. Use a `requires` expression to check for the validity of the expression `a + b`.
    ```cpp
    template<typename T>
    concept Addable = requires(T a, T b) {
        a + b;
    };
    ```
3.  **Apply the Concept:** Rewrite your `add` function from step 1, but constrain it with your `Addable` concept. Learn the four main ways to apply it:
    *   Trailing `requires` clause: `template<typename T> T add(T a, T b) requires Addable<T> { ... }`
    *   `requires` clause before the template list: `template<typename T> requires Addable<T> T add(T a, T b) { ... }`
    *   Constrained template parameter: `template<Addable T> T add(T a, T b) { ... }`
    *   Abbreviated function template (for function arguments): `void func(Addable auto param) { ... }`
4.  **Compose Concepts:** Concepts are boolean predicates, so they can be combined using `&&` and `||`. Create a concept `Integral` using the `std::is_integral_v` type trait. Then, create a new concept `AddableIntegral` that combines `Addable && Integral`.
5.  **Explore `requires` Expressions:** Go deeper into `requires` expressions. Learn the four types of requirements:
    *   *Simple requirement:* `a + b;` (checks if the expression is valid)
    *   *Type requirement:* `typename T::value_type;` (checks for a nested type)
    *   *Compound requirement:* `{ a + b } -> std::same_as<T>;` (checks expression validity and that its return type matches a concept)
    *   *Nested requirement:* `requires some_other_concept<T>;` (evaluates another concept)
6.  **Refactor an Old Template:** Find a piece of pre-C++20 code (or write one) that uses `std::enable_if`. Refactor it to use concepts. Notice how much cleaner the syntax becomes and how the intent is communicated directly in the function signature.

## Key ideas, with intuition
1.  **Concepts are Contracts:** A concept is a formal contract between a template and the types used to instantiate it. If a type "signs" the contract by fulfilling all requirements, it can be used. If not, the compiler immediately rejects it with a clear reason: "Type 'X' does not satisfy concept 'Y'".
2.  **Syntactic, Not Semantic:** A `requires` expression checks for syntactic validity only. The check `requires(T a, T b) { a + b; }` only verifies that the compiler knows how to compile the expression `a + b`. It does *not* check if the operation is mathematically correct or meaningful. For example, adding two `std::string` objects is syntactically valid (concatenation), but might be semantically wrong if your algorithm expected numerical addition.
3.  **Compile-Time Predicates:** Think of a concept like a boolean function that is evaluated at compile time.
    $$
    \text{Concept}(\text{Type}) \rightarrow \{\text{true}, \text{false}\}
    $$
    This boolean result is then used by the compiler to decide which template overload to select or whether to issue an error. This is why concepts can be combined with `&&` and `||`.
4.  **Overload Resolution, Not Hard Errors:** Unlike `static_assert`, which causes a hard compilation failure, concepts participate in overload resolution. If a type doesn't match a concept for one template overload, the compiler will simply discard that overload and look for another that might work. This is the same mechanism as SFINAE but with superior syntax and diagnostics.

## Worked example
We will write a template function `dot_product` that computes the dot product of two vector-like containers. The contract is that the containers must be iterable, and their elements must be numerical types that can be multiplied and added.

**Step 1: Define the concepts.**
First, we need a concept for any type that supports multiplication and addition. We'll also constrain the result to be convertible back to the element type.

```cpp
#include <concepts>
#include <type_traits>

// Concept to check for basic arithmetic operations needed for dot product.
template<typename T>
concept Arithmetic = std::is_arithmetic_v<T>;

template<typename T>
concept DotProductComputable = Arithmetic<T> && requires(T a, T b) {
    { a * b } -> std::convertible_to<T>;
    { a + b } -> std::convertible_to<T>;
};
```
*Reflection:* We use the standard library concept `std::is_arithmetic_v` for a basic check. Then, our custom concept `DotProductComputable` builds on it, adding requirements for the specific operations `*` and `+` and ensuring their results are compatible.

**Step 2: Define the container concept.**
Next, we need a concept for a container that is iterable and whose elements satisfy `DotProductComputable`.

```cpp
#include <ranges> // for std::ranges::range

// Concept for a container whose elements are DotProductComputable.
template<typename C>
concept DottableContainer = std::ranges::range<C> && 
                            DotProductComputable<typename C::value_type>;
```
*Reflection:* We reuse the standard `std::ranges::range` concept to check for iterability (`begin()` and `end()`). We then combine it with our previous concept, applying it to the container's `value_type`. This composition is a key strength of concepts.

**Step 3: Write and constrain the template function.**
Now we write the `dot_product` function, using our `DottableContainer` concept.

```cpp
#include <iostream>
#include <vector>
#include <numeric> // for std::inner_product

template<DottableContainer C>
auto dot_product(const C& v1, const C& v2) {
    // Assuming v1 and v2 have the same size for simplicity.
    // A real implementation would add a size check.
    using T = typename C::value_type;
    return std::inner_product(v1.begin(), v1.end(), v2.begin(), T{});
}
```
*Reflection:* The function signature `template<DottableContainer C>` is incredibly clear. It states exactly what kind of type `C` must be. The implementation can then safely assume that the container is iterable and its elements support the necessary arithmetic.

**Step 4: Test with valid and invalid types.**

```cpp
int main() {
    std::vector<double> a = {1.0, 2.0, 3.0};
    std::vector<double> b = {4.0, 5.0, 6.0};
    std::cout << "Dot product: " << dot_product(a, b) << std::endl; // Compiles and runs

    std::vector<std::string> s1 = {"a"};
    std::vector<std::string> s2 = {"b"};
    // dot_product(s1, s2); // Fails to compile
}
```
*Reflection:* When compiling the commented-out line, the compiler will produce a clean error stating that `std::string` does not satisfy the `Arithmetic` concept, which is a requirement of `DotProductComputable`, which is a requirement of `DottableContainer`. The chain of logic is explicit and easy to debug.

## Diagrams
Here is a diagram illustrating the "filter" analogy for template constraints.

```text
      Template Parameter Candidates
      (int, double, std::string, MyClass, ...)
                 |
                 |
                 v
+------------------------------------+
|         Concept: DottableContainer |
|                                    |
|   Requirements:                    |
|   - Is a range? (has begin/end)    |
|   - value_type is Arithmetic?      |
|   - value_type supports * and +?   |
+------------------------------------+
       |                  |
       | (Pass)           | (Fail)
       v                  v
  Valid Types           Rejected Types
(std::vector<double>,    (std::vector<std::string>,
 std::array<int, 3>)      int, MyClass)
       |
       |
       v
+----------------------+
| Template Instantiation |
| dot_product(...)     |
+----------------------+
```

## Memory technique — remember this forever
1.  **Mnemonic Story:** Imagine a template is a high-tech factory that can build things out of any material (`typename T`). Before C++20, you'd just throw any material in, and the factory would explode if the material wasn't right, leaving a huge mess (the compiler error). **Concepts** are the new **Quality Control Inspector** standing at the factory gate. The inspector has a checklist (`requires`). If the material (`T`) doesn't meet every item on the checklist, it's rejected immediately with a clear report. The inspector's title is the `concept` name.

2.  **Must Overlearn Syntax:**
    *   Defining a concept:
        `template<typename T> concept MyConcept = requires(T a) { ... };`
    *   Using a concept (cleanest form):
        `template<MyConcept T> void my_function(T val);`

3.  **Spaced Repetition Schedule:** Review your notes and re-implement the `dot_product` example from scratch at these intervals: **1 day, 3 days, 7 days, 16 days, 35 days.** Do not just read it; you must type it and make it compile.

4.  **First Principles Pathway:** If you forget the syntax, rebuild it from this core idea: "How do I check a property of a type at compile time?" Your first thought should be `static_assert(some_condition<T>::value, "Error");`. A concept is just a way to give a name to `some_condition<T>::value`, make it reusable, and have it integrate with function overloading instead of causing a hard error. The `requires` keyword is the special syntax C++ provides to build that `some_condition` by checking for valid expressions.

## Common mistakes
1.  **Confusing `requires` Clauses and `requires` Expressions:**
    *   `requires MyConcept<T>` is a *clause* that applies a constraint.
    *   `requires(T a) { ... }` is an *expression* used inside a concept definition to check for valid syntax. Don't mix them up.
2.  **Checking for Semantics, Not Syntax:** Putting runtime logic inside a `requires` expression.
    ```cpp
    // WRONG
    template<typename T>
    concept NonEmpty = requires(T t) {
        !t.empty(); // This is a runtime check, not a compile-time property.
    };
    ```
    A concept can only check if `t.empty()` is a valid expression that returns something convertible to `bool`. It cannot check the runtime value.
3.  **Forgetting `typename` for Dependent Types:** Inside a `requires` expression, if you need to access a nested type of a template parameter, you still need the `typename` keyword.
    ```cpp
    template<typename C>
    concept HasValueType = requires {
        typename C::value_type; // Correct
    };
    ```

## Self-check
1.  Define a concept named `Streamable` that checks if a type `T` can be inserted into a `std::ostream` (e.g., `std::cout << t;`).
2.  Write a template function `print_container(const C& container)` that prints all elements of a container separated by commas. Constrain `C` to be an iterable range and its elements to be `Streamable`.
3.  Consider these two function templates. Explain a scenario where they would behave differently. What specific type for `T` would call one but not the other?
    ```cpp
    // Overload 1
    template<typename T> requires std::integral<T>
    void process(T value);

    // Overload 2
    template<typename T> requires std::floating_point<T>
    void process(T value);
    ```