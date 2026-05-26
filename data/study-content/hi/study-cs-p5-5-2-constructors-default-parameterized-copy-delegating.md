## 1. The one-sentence answer
**Constructors are special member functions that initialise an object's data members the moment the object is created, and C++ provides four distinct forms — default, parameterized, copy, and delegating — each with precise rules for when the compiler generates or calls them.**

A constructor runs automatically when you write a line such as `MyClass obj(42);`. Its job is to put the object into a valid state before any other member function can touch it. Without a constructor the compiler silently writes a trivial one for you; once you write any constructor yourself, that automatic one disappears and you must supply every initialisation path yourself.

Default constructors take no arguments and are what you get when you simply declare an object. Parameterised constructors accept arguments so you can set values at creation time. Copy constructors create a new object by duplicating an existing one and are invoked on pass-by-value or explicit copy syntax. Delegating constructors, introduced in C++11, let one constructor hand off work to another constructor of the same class, removing duplicate initialisation code.

> [!NOTE]
> The single most important realisation is that every object you ever create must pass through exactly one constructor call; understanding which constructor is chosen (and why) removes almost all “uninitialised memory” bugs in C++.

## 2. Why this matters — concrete and current
In the LLVM/Clang codebase the `clang::Decl` hierarchy uses delegating constructors to keep every declaration node in a known state the instant it is allocated, eliminating an entire class of null-pointer checks during semantic analysis.

Google’s TensorFlow runtime creates thousands of `Tensor` objects per training step; the copy constructor is deliberately deleted and move constructors are used instead, so that large buffers are never accidentally duplicated on the heap.

NASA’s flight software for the Perseverance rover (written in C++11) relies on parameterised constructors with `constexpr` to initialise constant lookup tables at compile time, guaranteeing zero runtime initialisation latency for critical control loops.

The Eigen linear-algebra library uses carefully written copy constructors that perform shallow copies of expression templates; any mistake here would turn an O(n) operation into an O(n²) one inside hot matrix-multiplication kernels.

## 3. Mental prerequisites

| Concept | Why you need it here |
|---------|----------------------|
| Class definition and access specifiers | Constructors are declared inside the class body with the same name as the class. |
| Member initialiser lists | The only place you can initialise `const` and reference members before the constructor body runs. |
| Lvalue vs rvalue and references | Explains when the copy constructor versus move constructor is selected. |
| Function overloading resolution | Determines which constructor is picked from several candidates. |

If any row above is unfamiliar, pause and read the corresponding section before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — The compiler’s free default constructor
When you write a class with no constructors at all, the compiler generates a public default constructor that default-initialises every member.  
Example:  
```cpp
class Point { int x, y; };
Point p;          // compiler-generated Point::Point() runs
```
Formal rule: if no user-declared constructor exists, a default constructor is implicitly declared.  
> [!WARNING] Once you write any constructor, the implicit default constructor is no longer generated; forgetting this is the source of “no matching function” errors.

### Step 2 — Writing a parameterised constructor
You supply arguments that become the initial values of members.  
Example:  
```cpp
Point(int a, int b) : x(a), y(b) {}
```
The member-initialiser list runs before the constructor body, guaranteeing members are set before any code inside the braces executes.

### Step 3 — The copy constructor signature
```cpp
Point(const Point& other);
```
It must take a `const` lvalue reference; taking by value would cause infinite recursion.  
Formal statement: the copy constructor is called when an object is initialised from an lvalue of the same type.

### Step 4 — Implicit generation versus user definition
If you do not declare a copy constructor, the compiler generates one that copies each member. Declaring any constructor (even a default one) does not suppress the implicit copy constructor unless you also declare the copy constructor yourself.

### Step 5 — Delegating constructors (C++11)
One constructor may delegate to another of the same class using the member-initialiser syntax:  
```cpp
Point() : Point(0, 0) {}          // delegates to the two-parameter version
```
The delegated constructor body runs after the target constructor finishes.

### Step 6 — Rule of zero / three / five
If you must manage resources, you usually need the copy constructor, copy assignment, and destructor (Rule of Three). In modern C++ the Rule of Five adds the move operations; otherwise follow the Rule of Zero and let the compiler generate everything.

### Step 7 — Overload resolution at object creation
When multiple constructors exist, the compiler matches the argument list exactly as it does for ordinary overloaded functions, including implicit conversions.

## 5. Worked examples — har step show karo

**Example 1 — Implicit default constructor**  
*Given:* an empty class definition.  
*Find:* whether `Point p;` compiles.  
Step 1: no user constructor exists.  
Step 2: compiler implicitly declares `Point::Point()`.  
Step 3: member variables receive default initialisation.  
**Final answer:** compiles and `p.x`, `p.y` contain indeterminate values.  
*Reflection:* the example shows why you should never rely on implicit defaults for non-trivial classes.

**Example 2 — Parameterised constructor with initialiser list**  
*Given:*  
```cpp
class Point {
    int x, y;
public:
    Point(int a, int b) : x(a), y(b) {}
};
```
*Find:* state of `Point q(3,4);`.  
Step 1: constructor `Point(int,int)` matches.  
Step 2: initialiser list sets `x=3`, `y=4` before body.  
**Final answer:** `q` contains (3,4).  
*Reflection:* initialiser lists are mandatory for `const` or reference members.

**Example 3 — Explicit copy constructor**  
*Given:* a class that logs construction.  
*Find:* how many times the log appears when `Point r = s;` is executed.  
Step 1: user-defined copy constructor is called.  
Step 2: no implicit copy is generated.  
**Final answer:** exactly one log line from the copy constructor.  
*Reflection:* writing any constructor does not automatically suppress the copy constructor; you must declare it to control copying.

**Example 4 — Delegating constructor**  
*Given:*  
```cpp
Point() : Point(0,0) {}
Point(int a, int b) : x(a), y(b) {}
```
*Find:* object created by `Point t;`.  
Step 1: default constructor delegates.  
Step 2: two-parameter constructor initialises members.  
**Final answer:** `t` is (0,0) with no code duplication.  
*Reflection:* delegation removes repeated initialisation logic while preserving a single point of resource acquisition.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Forgetting to initialise `const` members | They must be set in the initialiser list; assignment inside body is too late. | Always list every `const` and reference member in the initialiser list. |
| Accidental infinite recursion with copy constructor | Declaring `Point(Point p)` instead of `Point(const Point& p)`. | Remember the signature must be by `const` reference. |
| Assuming the default constructor still exists after defining any constructor | Compiler stops generating it the moment you write one. | Explicitly write `MyClass() = default;` if you need both. |
| Copying large objects by value unintentionally | Pass-by-value invokes the copy constructor. | Pass large objects by `const` reference or move when possible. |
| Using delegating constructors incorrectly across inheritance | Delegation only works within the same class. | Keep delegation inside one class; use base-class initialisers for inheritance. |
| Forgetting that implicit copy is deleted when a user destructor exists (C++11) | Rule of Five kicks in. | Declare the special members you need or follow the Rule of Zero. |
| Initialiser order differs from declaration order | Members are initialised in declaration order, not list order. | Keep the initialiser list in the same order as member declarations. |

## 7. The textbook-precise statement
A constructor is a member function with the same name as its class and no return type. If a class `C` defines no constructors, an implicit default constructor is declared. A copy constructor for `C` has the form `C::C(const C&)` or `C::C(C&)`. A delegating constructor is a constructor whose first *mem-initializer* names the class itself. Overload resolution selects the constructor to be called at object creation. (Stroustrup, *The C++ Programming Language*, 4e, §17.4–17.5)

## 8. Visual — diagram or schematic
```text
Object creation flow
+------------------+     matches args     +------------------+
|  Point p;        | ------------------>  | default ctor     |
+------------------+                      +------------------+
                                           |
+------------------+     matches (int,int) | +------------------+
|  Point q(3,4);   | ------------------>  | | param ctor       |
+------------------+                      +------------------+
                                           |
+------------------+   lvalue of same type | +------------------+
|  Point r = q;    | ------------------>  | | copy ctor        |
+------------------+                      +------------------+
                                           |
+------------------+   delegates to        | +------------------+
|  Point s;        | ------------------>  | | delegating ctor  |
+------------------+                      +------------------+
```

## 9. The memory technique
1. **The hook** — picture four different doors labelled “Default”, “Param”, “Copy”, and “Delegate”; every object must walk through exactly one door the instant it is born.
2. **What to overlearn** — signature of copy constructor must be `const T&`; delegating syntax is `T() : T(args) {}`.
3. **Spaced-repetition schedule** — review the four signatures after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — ask “who needs to run before any member function can be called?”; the answer is always a constructor, then decide which form matches the syntax you wrote.

## 10. What this unlocks
Mastery of constructors lets you implement the Rule of Five correctly, write exception-safe classes, and understand move semantics that appear in later topics.

- Move constructors and move assignment
- `std::unique_ptr` and RAII patterns
- Initialiser-list constructors for container classes
- `constexpr` constructors used in compile-time programming

## 11. Self-check — five questions, no answers
1. What happens to the implicit default constructor when you declare a two-parameter constructor?
2. Write the exact signature required to suppress the implicit copy constructor while still allowing move operations.
3. In a delegating constructor, which constructor’s body executes first?
4. Identify the bug: `class X { const int n; X(int v) { n = v; } };`.
5. Given three constructors `X()`, `X(int)`, and `X(const X&)`, which one is called by `X a = 5;` and why?