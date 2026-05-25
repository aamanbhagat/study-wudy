## What it is
The Liskov Substitution Principle (LSP) states that objects of a superclass should be replaceable with objects of its subclasses without breaking the application. In other words, a subclass must be a true *behavioral* substitute for its superclass. This means the subclass must not only match the superclass's interface but also its expected behavior and contracts.

## Why it matters
This principle is the bedrock of reliable polymorphism and enables building modular, extensible systems. In aerospace flight software, a `Sensor` base class might have subtypes like `Gyroscope`, `Accelerometer`, or `StarTracker`. The flight control system must be able to use any `Sensor` subtype interchangeably without failure; a `StarTracker` that unexpectedly requires a 5-second warm-up (a new precondition) where a generic `Sensor` does not would violate LSP and could lead to catastrophic failure during a critical maneuver.

## When to study it
You must have a firm grasp of inheritance, polymorphism, and abstract classes/interfaces. A conceptual understanding of Design by Contract (preconditions, postconditions, and invariants) is also essential, as LSP is its formal application to inheritance. If you are not comfortable with these, pause and review them first.

## How to study it (step by step)
1.  **Review Inheritance vs. Subtyping:** Write a short paragraph distinguishing class inheritance (a mechanism for code reuse) from interface subtyping (a relationship of substitutability). LSP is about subtyping.
2.  **Formalize the Contracts:** Read up on Bertrand Meyer's Design by Contract. Specifically, understand the definitions of preconditions, postconditions, and class invariants.
3.  **Code the Canonical Violation:** Implement the classic "Square is-a Rectangle" problem. Create a `Rectangle` class with `setWidth` and `setHeight`. Then, create a `Square` class that inherits from `Rectangle` and overrides these methods to maintain the square's invariant (width must equal height).
4.  **Write a Failing Client:** Write a function that accepts a `Rectangle` object, sets its width to 5 and its height to 10, and then asserts that its area is 50. Pass a `Square` object to this function and observe the assertion failure. This is the LSP violation in action.
5.  **Refactor for Compliance:** Fix the design. This usually involves breaking the inheritance hierarchy and using composition or a different abstraction (e.g., a `Quadrilateral` interface).
6.  **Analyze the Rules:** For the `Square`/`Rectangle` example, write down the preconditions, postconditions, and invariants for both classes. Identify exactly which rule from Design by Contract was broken by the `Square` subclass.

## Key ideas, with intuition
1.  **Behavioral Subtyping, Not Just Syntactic:** A subclass can have the exact same method signatures as its parent but still violate LSP if its *behavior* is different. A method in a subclass that does nothing, or throws a new type of exception, or has a side effect the base class doesn't, is a behavioral change. The "is-a" relationship must apply to behavior, not just to names.

2.  **The Contract Rules (The Formalism):** Let $S$ be a subtype of $T$. For any method $m$, LSP holds if:
    *   **Preconditions cannot be strengthened.** The subtype method cannot demand more from the caller than the supertype method did. If the base method works for any integer, the subclass method cannot require the integer to be positive.
        $$ \text{pre}_{T}(m) \implies \text{pre}_{S}(m) $$
    *   **Postconditions cannot be weakened.** The subtype method must guarantee at least as much as the supertype method did. If the base method guarantees it returns a non-null value, the subclass method cannot return null.
        $$ \text{post}_{S}(m) \implies \text{post}_{T}(m) $$
    *   **Invariants must be preserved.** All invariants (conditions that are always true for an object) of the supertype must also be maintained by the subtype. A `Rectangle`'s invariant is that its width and height are independent; a `Square` violates this.

3.  **The "No Surprises" Principle:** A client function written to operate on a base class reference should continue to work correctly and without surprise, no matter which subclass instance it receives. If you have to write `if (obj is Square) { ... } else if (obj is Rectangle) { ... }`, you have violated LSP.

## Worked example
Let's use the classic `Rectangle` and `Square` example.

**The Flawed Design (LSP Violation):**

We start with a `Rectangle` class. Its implicit contract is that width and height can be set independently.

```java
class Rectangle {
    protected int width;
    protected int height;

    public void setWidth(int width) { this.width = width; }
    public void setHeight(int height) { this.height = height; }
    public int getWidth() { return width; }
    public int getHeight() { return height; }
    public int getArea() { return width * height; }
}
```

A `Square` is a `Rectangle`, so we inherit. To maintain the "squareness" invariant (width == height), we must override the setters.

```java
class Square extends Rectangle {
    @Override
    public void setWidth(int width) {
        this.width = width;
        this.height = width; // Maintain invariant
    }

    @Override
    public void setHeight(int height) {
        this.width = height; // Maintain invariant
        this.height = height;
    }
}
```

Now, consider a client that uses a `Rectangle`. It has no knowledge of `Square`.

```java
class AreaCalculator {
    public void resizeAndCheck(Rectangle r) {
        // Client's expectation based on Rectangle's contract
        r.setWidth(5);
        r.setHeight(10);
        // Assertion: Area should be 5 * 10 = 50
        assert r.getArea() == 50 : "Area calculation failed!";
    }
}
```

**Execution and Reflection:**

1.  **`calculator.resizeAndCheck(new Rectangle())`**: This works perfectly. `setWidth(5)` sets width to 5. `setHeight(10)` sets height to 10. `getArea()` returns `5 * 10 = 50`. The assertion passes.
2.  **`calculator.resizeAndCheck(new Square())`**: This fails. `setWidth(5)` sets both width and height to 5. `setHeight(10)` then sets both width and height to 10. `getArea()` returns `10 * 10 = 100`. The assertion `100 == 50` fails.

**Why it failed:** The `Square` subclass strengthened the postcondition of the setters. The `Rectangle.setWidth` method guarantees "the width is now `w`, and the height is unchanged." The `Square.setWidth` method changes this to "the width is now `w`, and the height is also `w`." This change in behavior violates the client's reasonable assumption about the `Rectangle` contract, causing the program to fail. The `Square` is not substitutable for a `Rectangle`.

## Diagrams
Here is the flawed inheritance hierarchy and the client's interaction. The client holds a reference to the base type but receives a subtype, which causes the unexpected behavior.

```text
       +-----------------+
       |    Rectangle    |
       |-----------------|
       | - width         |
       | - height        |
       |-----------------|
       | + setWidth()    |
       | + setHeight()   |
       | + getArea()     |
       +-----------------+
               ^
               | (is-a ?)
               |
       +-----------------+
       |      Square     |
       |-----------------|
       | ... (overrides) |
       +-----------------+

+--------------------+      uses      +-----------------+
|   AreaCalculator   |-------------->|    Rectangle    |
|--------------------|                +-----------------+
| + resizeAndCheck(r)|                      ^
+--------------------+                      |
                                            | (substitutes, but breaks)
                                            |
                                          +-----------------+
                                          |      Square     |
                                          +-----------------+
```

## Memory technique — remember this forever
1.  **Visual Hook:** Think of an **electrical socket**. The Liskov Substitution Principle means any appliance with a standard plug (the subclass) must work in any standard wall outlet (the base class interface) without causing a fire or blowing a fuse (breaking the program). A plug that requires a different voltage (a strengthened precondition) or draws unexpected current (violating a postcondition) is a bad plug.

2.  **Must-Know Facts:**
    *   Substitutability: Subtypes must be substitutable for their base types.
    *   Preconditions: Cannot be strengthened in the subtype.
    *   Postconditions: Cannot be weakened in the subtype.

3.  **Spaced Repetition Schedule:** Review this lesson and your notes in **1 day, 3 days, 7 days, 16 days, and 35 days**. Actively try to find an LSP violation in code you are writing or reading on each review day.

4.  **First Principles Pathway:** If you forget the rules, re-derive them from the core idea of substitutability. Imagine a function `void operate(Base b)`. If you pass it a `Derived d`, what must be true for `operate` to not break?
    *   `d` must not require anything *more* than `b` requires. If `operate` promises to provide `b` with an integer, `d` can't suddenly demand it be a *positive* integer. (Preconditions cannot be strengthened).
    *   `d` must promise to do *at least* what `b` promises. If `b` promises to return a result, `d` can't suddenly return nothing. (Postconditions cannot be weakened).

## Common mistakes
1.  **The "is-a" trap:** Confusing a real-world "is-a" relationship (a square is a rectangle) with a behavioral "is-a" relationship required for subtyping. They are not always the same.
2.  **Overriding a method with an empty body:** A subclass method that does nothing when the base class method was expected to perform an action is a classic LSP violation. It weakens the postcondition to "nothing is guaranteed to happen."
3.  **Throwing new exception types:** If a base method doesn't declare that it throws `SomeException`, an overriding subclass method cannot throw it. This is a form of strengthening the precondition: "the caller must now be prepared to handle `SomeException`."
4.  **Ignoring class invariants:** Focusing only on method pre/post conditions while forgetting that the subclass must also uphold all invariants of the base class. The Square/Rectangle problem is a failure to preserve the invariant of independent width and height.

## Self-check
1.  Consider a base class `Bird` with a method `fly()`. A `Penguin` class inherits from `Bird`. How would you implement `Penguin.fly()` without violating LSP? What does this suggest about the class hierarchy?
2.  A base method `process(Data d)` has a precondition that `d` must not be null. Its postcondition is that it returns an integer result $\ge 0$. Which of the following overridden methods in a subclass would be valid according to LSP?
    a) Precondition: `d` is not null and `d.value > 100`. Postcondition: returns result $\ge 0$.
    b) Precondition: `d` can be null. Postcondition: returns result $\ge 0$.
    c) Precondition: `d` is not null. Postcondition: returns result $\ge 10$.
    d) Precondition: `d` is not null. Postcondition: returns any integer (positive, negative, or zero).
3.  You are designing a system for a document editor. You have a base class `ReadOnlyDocument` with a method `string getContent()`. You need a new class, `WritableDocument`. Is it appropriate for `WritableDocument` to inherit from `ReadOnlyDocument`? Justify your answer strictly in terms of LSP.