## What it is
Variadic templates are a C++ feature that allows functions and classes to accept an arbitrary number of template arguments. These arguments are bundled into a "parameter pack," which can be processed (or "unpacked") within the template's implementation, most elegantly using C++17 fold expressions.

## Why it matters
This is the mechanism behind fundamental C++ utilities like `std::tuple`, `std::function`, and `std::make_unique`. In scientific computing, you might write a function to compute the norm of a vector with a variable number of dimensions, or a logging function in a rocket's flight software that can accept any combination of sensor readings (e.g., `log(timestamp, pressure, temp)` vs. `log(timestamp, quaternion, angular_velocity)`).

## When to study it
You must be comfortable with standard C++ templates for both functions and classes, including template argument deduction. A solid grasp of recursion is essential for understanding the C++11/14 method of unpacking, which provides the foundational logic that fold expressions abstract away.

## How to study it (step by step)
1.  **Write a recursive variadic function (C++11 style).** Implement a function `void print(...)` that takes any number of arguments and prints them to `std::cout`, separated by spaces. You will need two functions: a base case `void print()` for an empty list, and the recursive template `template<typename T, typename... Args> void print(T first, Args... args)`.
2.  **Understand the pack expansion.** In your recursive `print` function, observe the two uses of `...`: `typename... Args` declares a template parameter pack, and `Args... args` declares a function parameter pack. The recursive call `print(args...)` is a pack expansion.
3.  **Refactor to a fold expression (C++17 style).** Rewrite your `print` function using a single C++17 fold expression. The expression `(std::cout << ... << args)` might seem appealing but has operator precedence issues. A correct approach is `((std::cout << args << ' '), ...);`. Analyze why this works.
4.  **Implement a mathematical fold.** Write a function `sum(...)` that returns the sum of all its arguments. First, implement it recursively (C++11 style), then with a fold expression like `(args + ...)` (C++17 style).
5.  **Explore the four fold forms.** Research and write small examples for the four types of folds: unary right `(pack op ...)`, unary left `(... op pack)`, binary right `(pack op ... op init)`, and binary left `(init op ... op pack)`. Note how they differ in associativity and behavior with empty packs.
6.  **Sketch a variadic class template.** Outline the structure of a class `template<typename... Ts> class MyTuple;`. You don't need a full implementation, but think about how you would store the parameters and how you might access the N-th element. This will solidify the concept of a pack of types.

## Key ideas, with intuition
1.  **Parameter Pack: A Heterogeneous Bag.** Think of a parameter pack not as a standard container, but as a compile-time "bag" that holds a sequence of zero or more types or values. The `...` syntax is the key indicator.
    *   `template<typename... Ts>`: `Ts` is a template parameter pack, a bag of *types*.
    *   `void func(Ts... args)`: `args` is a function parameter pack, a bag of *values* whose types are given by `Ts`.

2.  **Expansion: Unpacking the Bag.** A parameter pack is useless until you unpack it. The expansion syntax `pack...` unpacks the elements into a comma-separated list.
    $$
    \text{If } \texttt{args} \text{ contains } \{v_1, v_2, v_3\}, \text{ then } \texttt{func(args...)} \text{ becomes } \texttt{func(v\_1, v\_2, v\_3)}.
    $$
    This is the fundamental operation. You expand the pack inside a context where a comma-separated list is expected, like a function call argument list.

3.  **Recursion: Peeling One Layer at a Time (C++11/14).** The original way to process a pack was recursive. You write a variadic function that handles the first element and then calls itself with the *rest* of the pack. A non-template base case handles the final empty-pack call. This is like processing the head of a list and then recursing on the tail.

4.  **Fold Expressions: Abstracting the Recursion (C++17).** Fold expressions provide a concise syntax to apply a binary operator over all the elements in a pack. This avoids writing explicit recursion.
    $$
    \texttt{(... op pack)} \implies (\dots((E_1 \text{ op } E_2) \text{ op } E_3) \dots \text{ op } E_N) \quad \text{(left fold)}
    $$
    $$
    \texttt{(pack op ...)} \implies (E_1 \text{ op } (\dots (E_{N-1} \text{ op } E_N)\dots)) \quad \text{(right fold)}
    $$
    Think of it as reducing a sequence to a single value, like `sum` or `product` in functional programming.

## Worked example
Let's implement a function `multiply` that computes the product of an arbitrary number of arguments, first with recursion (C++11) and then with a fold expression (C++17).

**1. Recursive C++11/14 Implementation**

```cpp
#include <iostream>

// Base case: The product of nothing is the multiplicative identity, 1.
long long multiply() {
    return 1;
}

// Recursive step:
// Takes the first argument `head` and the rest of the arguments `tail...`.
// Returns `head` multiplied by the product of the rest.
template<typename T, typename... Args>
long long multiply(T head, Args... tail) {
    return head * multiply(tail...);
}

int main() {
    std::cout << multiply(2, 3, 4) << std::endl; // Prints 24
    std::cout << multiply(5) << std::endl;      // Prints 5
    std::cout << multiply() << std::endl;       // Prints 1
}
```

*   **Step 1 (Call):** `multiply(2, 3, 4)` is called. `T` is `int` (2), `Args...` is `{int, int}`. `head` is `2`, `tail...` is `{3, 4}`.
*   **Step 2 (Recursion):** The function returns `2 * multiply(3, 4)`.
*   **Step 3 (Recursion):** `multiply(3, 4)` is called. It returns `3 * multiply(4)`. The expression is now `2 * (3 * multiply(4))`.
*   **Step 4 (Recursion):** `multiply(4)` is called. It returns `4 * multiply()`. The expression is now `2 * (3 * (4 * multiply()))`.
*   **Step 5 (Base Case):** `multiply()` is called. This matches the non-template base case and returns `1`.
*   **Step 6 (Unwinding):** The expression evaluates: `2 * (3 * (4 * 1)) = 2 * (12) = 24`.

**2. Fold Expression C++17 Implementation**

```cpp
#include <iostream>

template<typename... Args>
long long multiply_fold(Args... args) {
    // A right unary fold over the multiplication operator.
    // If the pack is empty, this would be a compile error for `*`.
    // We can use a binary fold to handle the empty case.
    return (args * ... * 1); // Binary right fold with identity 1
}

int main() {
    std::cout << multiply_fold(2, 3, 4) << std::endl; // Prints 24
    std::cout << multiply_fold(5) << std::endl;      // Prints 5
    std::cout << multiply_fold() << std::endl;       // Prints 1
}
```

*   **Step 1 (Expansion):** The compiler sees the binary right fold `(args * ... * 1)`.
*   **Step 2 (Transformation):** For the call `multiply_fold(2, 3, 4)`, this expands to `(2 * (3 * (4 * 1)))`. The `1` is the identity value for an empty pack.
*   **Step 3 (Evaluation):** The expression is calculated directly, yielding `24`. This is much more efficient as it avoids recursive function call overhead. The empty call `multiply_fold()` expands to just the identity value, `1`.

## Diagrams
Here is the call stack for the recursive `multiply(2, 3, 4)`:

```text
main()
 |
 +-- multiply(2, 3, 4)
      |
      +-- return 2 * multiply(3, 4)
                    |
                    +-- return 3 * multiply(4)
                                  |
                                  +-- return 4 * multiply()
                                                |
                                                +-- return 1 (Base Case)
```

And here is how a C++17 right fold `(args op ...)` expands for a pack `{E1, E2, E3, E4}`:

```text
(E1 op (E2 op (E3 op E4)))

Example: (args + ...) for {1, 2, 3, 4}
(1 + (2 + (3 + 4)))
   \    /
    \  7
     \ /
      9
       \
        10
```

## Memory technique — remember this forever
1.  **The Story:** Think of `...` as a magical "etcetera" operator. `typename... Args` means "a list of types, etcetera". `func(args...)` means "call func with these arguments, etcetera". A fold expression is like telling the compiler, "take all these arguments, etcetera, and just fold them up with this plus sign." It's a command to collapse the whole list.

2.  **Must Overlearn:**
    *   Declaration: `template<typename... Ts> void func(Ts... args);`
    *   Recursive Unpacking Call: `func(args...);`
    *   Right Unary Fold: `(pack op ...)`
    *   Right Binary Fold (safer): `(pack op ... op identity_value)`

3.  **Spaced Repetition Schedule:** Review this material and re-implement the `multiply` function from scratch at **1 day, 3 days, 7 days, 16 days, 35 days**.

4.  **First Principles Pathway:** If you forget fold expressions, remember recursion. Any fold can be implemented with recursion.
    *   **Identify the operation:** What do you want to do with all the elements? (e.g., add them).
    *   **Define the base case:** What should happen with zero or one element? (e.g., sum of zero elements is 0).
    *   **Define the recursive step:** How do you combine the *first* element with the result of operating on the *rest*? (e.g., `head + sum(tail...)`).

## Common mistakes
1.  **Forgetting the Recursive Base Case:** In C++11/14 style, failing to provide a non-template overload for the empty pack (`func()`) will cause a compile error due to infinite recursion when the last element is processed.
2.  **Incorrect Expansion Syntax:** Writing `func(args)...` instead of `func(args...)`. The `...` applies to the pack `args`, not to the function call `func(...)`. The first would mean "call `func(arg)` repeatedly," which is a different pattern.
3.  **Unary Folds on Empty Packs:** Using a unary fold like `(args + ...)` on an empty pack is a compile error because there's no defined value for an empty sum. Use a binary fold `(args + ... + 0)` to provide an identity value.
4.  **Operator Precedence with Folds:** An expression like `(std::cout << args << " " ...)` will not compile. The fold applies to a single operator. The correct form is `((std::cout << args << " "), ...)` using the comma operator, which correctly sequences the print operations.

## Self-check
1.  Write a variadic function template `average` that takes one or more numeric arguments and returns their `double` average.
2.  Using recursion, write a variadic function `push_all_to_vector(std::vector<T>& vec, Args... args)` that takes a vector by reference and pushes all `args` into it. The types in `Args...` must be convertible to `T`.
3.  Implement a variadic function `are_all_true(...)` that accepts any number of boolean arguments and returns `true` if all of them are true, and `false` otherwise. Implement it using a fold expression. What happens if you call it with no arguments? How would you ensure it returns `true` in that case?