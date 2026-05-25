## 1. What it is — in plain English

Imagine you have a machine. This machine takes something you put into it, does a specific job, and then spits out something new. Crucially, every time you put the *exact same thing* into the machine, you *always* get the *exact same thing* out. It's perfectly consistent and predictable.

This "machine" is what we call a **function** in mathematics. The "something you put in" is called the **input**. The "something new it spits out" is called the **output**. The "specific job it does" is the **rule** or **mapping** that connects the input to the output.

Think of a vending machine for drinks. You press "Coke" (your input), and it gives you a Coke (your output). If you press "Coke" again, you'll get another Coke, not a Sprite or a bag of chips. The machine has a consistent rule: "Coke button" maps to "Coke can".

So, a function is just a consistent rule that takes an input and gives you exactly one output. It's a way of describing a relationship where one thing *determines* another.

## 2. Why it matters — real-world applications

Functions are fundamental to almost every field of science, engineering, and daily life because they allow us to model and predict relationships.

1.  **Physics & Engineering (e.g., Aerospace):** The trajectory of a rocket is a function of its initial velocity, launch angle, and engine thrust. Engineers use functions to calculate how high a rocket will go, how far it will travel, and where it will land. For example, the altitude $h$ of a projectile at time $t$ can be modeled by a quadratic function: $h(t) = - \frac{1}{2}gt^2 + v_0t + h_0$, where $g$ is gravity, $v_0$ is initial velocity, and $h_0$ is initial height. This function takes time (input) and gives altitude (output).

2.  **Economics & Business (e.g., Supply Chains):** The total cost of producing a certain number of items is a function of the quantity produced. Businesses use these functions to determine pricing strategies, production levels, and profit margins. For instance, the cost $C$ to produce $x$ units might be $C(x) = 10x + 500$, where $10x$ is the variable cost and $500$ is the fixed cost. Knowing this function helps a company like Amazon predict expenses based on order volume.

3.  **Computer Science & Machine Learning (e.g., Image Recognition):** In machine learning, an algorithm that classifies an image (e.g., "cat" or "dog") is essentially a complex function. It takes the raw image data (a matrix of pixel values) as input and outputs a classification label. For example, a neural network trained to recognize faces takes an image (input) and outputs a name (output), or a probability distribution over possible names. The "mapping" is learned through vast amounts of data.

4.  **Medicine & Biology (e.g., Drug Dosage):** The effective dosage of a drug for a patient can be a function of their body weight or age. Doctors use these functional relationships to prescribe safe and effective treatments. For example, the dosage $D$ of a certain antibiotic might be $D(w) = 5w + 10$ mg, where $w$ is the patient's weight in kilograms.

5.  **Environmental Science (e.g., Climate Modeling):** The predicted temperature in a region can be a function of factors like time of year, latitude, altitude, and current atmospheric conditions. Climate scientists use complex functions to model global warming trends, predicting future temperatures and sea levels based on various inputs.

## 3. Prerequisites — what you must know first

Before diving deep into functions, ensure you have a solid grasp of these foundational concepts:

*   **Variables:** Understanding what a variable is (a symbol representing a quantity that can change) and how to use letters like $x$, $y$, $a$, $b$ to represent unknown or changing values.
*   **Expressions:** How to combine numbers, variables, and operations (addition, subtraction, multiplication, division) to form mathematical phrases, like $2x+5$ or $y^2-3$.
*   **Equations:** Statements that two expressions are equal, typically involving an equals sign, like $2x+5=11$.
*   **Inequalities:** Statements comparing two expressions using symbols like $<, >, \le, \ge$.
*   **Order of Operations (PEMDAS/BODMAS):** The specific sequence in which mathematical operations should be performed to ensure consistent results.
*   **Basic Algebra:** Solving simple linear equations, substituting values into expressions, and manipulating algebraic terms.
*   **Coordinate Plane:** Understanding the Cartesian coordinate system, including the x-axis, y-axis, origin, and how to plot points $(x,y)$.

## 4. The core idea — step by step

Let's break down the concept of a function into its fundamental pieces.

### Step 1: The Idea of a "Rule" or "Process"

**Plain English:** A function is like a recipe or a set of instructions. You give it ingredients (inputs), and it tells you exactly what to do with them to get your final dish (output). The instructions must be clear and unambiguous.

**Concrete Example:** Consider the rule "double the number and then add 3".
*   If you input 5, the rule says: double 5 (which is 10), then add 3 (which is 13). Output: 13.
*   If you input -2, the rule says: double -2 (which is -4), then add 3 (which is -1). Output: -1.

**Formal/Mathematical Version:** We often represent this rule using an algebraic expression. If we use $x$ for the input and $y$ for the output, the rule "double the number and then add 3" becomes:
$$y = 2x + 3$$
Here, $y$ is determined by $x$.

**What could go wrong:** If the rule isn't clear or gives conflicting instructions, it's not a function. For example, "if the number is 5, output 10. If the number is 5, output 12." This is contradictory and thus not a function.

### Step 2: The Input and Output

**Plain English:** Every function takes something *in* and produces something *out*. The "in" is what you feed the rule, and the "out" is what you get after the rule has been applied.

**Concrete Example:** Using our rule $y = 2x + 3$:
*   If we choose $x=5$ as our **input**, then $y=2(5)+3 = 10+3=13$ is our **output**.
*   If we choose $x=-2$ as our **input**, then $y=2(-2)+3 = -4+3=-1$ is our **output**.

**Formal/Mathematical Version:**
*   The **input** is typically represented by an independent variable (often $x$).
*   The **output** is typically represented by a dependent variable (often $y$), because its value *depends* on the input.
*   We can write this relationship as a set of ordered pairs $(x, y)$, where $x$ is the input and $y$ is the corresponding output. For our example, $(5, 13)$ and $(-2, -1)$ are ordered pairs that satisfy the function.

**What could go wrong:** Sometimes students confuse which variable is the input and which is the output, especially when equations are rearranged. Always remember the output *depends* on the input.

### Step 3: The Uniqueness Condition (The "One Output" Rule)

**Plain English:** This is the most critical part of a function! For every single input you put into the function, there *must be exactly one* corresponding output. You can't put in the same thing twice and get different results. It's perfectly consistent.

**Concrete Example:**
*   **Function:** Our rule $y = 2x + 3$. If you input $x=5$, you *always* get $y=13$. You will never get $10$ or $15$ for the input $x=5$. This is a function.
*   **NOT a function:** Imagine a "rule" where if you input "fruit", sometimes you get "apple" and sometimes you get "banana". This is not a function because the same input ("fruit") can lead to multiple different outputs.
*   **Still a function:** It IS allowed for different inputs to produce the same output. For example, $y = x^2$. If you input $x=2$, output is $4$. If you input $x=-2$, output is $4$. Different inputs ($2$ and $-2$) lead to the same output ($4$). This is fine! The key is that for any *single* input, there's only one output.

**Formal/Mathematical Version:** For every element $x$ in the domain (set of all possible inputs), there exists precisely one element $y$ in the codomain (set of all possible outputs) such that $y$ is related to $x$ by the function.
This is often stated as: "A relation $f$ is a function if for every $x$, if $(x, y_1) \in f$ and $(x, y_2) \in f$, then $y_1 = y_2$."

**What could go wrong:** This is the most common point of confusion. Students often mistakenly think that if two different inputs lead to the same output, it's not a function. Remember: one input $\rightarrow$ one output. Many inputs $\rightarrow$ one output is fine. One input $\rightarrow$ many outputs is *not* a function.

### Step 4: Function Notation ($f(x)$)

**Plain English:** Instead of always writing "$y = \text{rule involving } x$", mathematicians developed a shorthand. We use $f(x)$ to mean "the output of the function $f$ when the input is $x$". It's read as "f of x". The letter $f$ is just a name for the function, like calling your machine "Vending Machine A" or "Vending Machine B". You can use other letters too, like $g(x)$ or $h(t)$.

**Concrete Example:** Our rule "double the number and then add 3" can be written as:
$$f(x) = 2x + 3$$
*   To find the output when the input is 5, we write $f(5)$.
    $$f(5) = 2(5) + 3 = 10 + 3 = 13$$
*   To find the output when the input is -2, we write $f(-2)$.
    $$f(-2) = 2(-2) + 3 = -4 + 3 = -1$$
So, $f(5)=13$ means "when the input to function $f$ is 5, the output is 13."

**Formal/Mathematical Version:**
The notation $f: A \to B$ means "function $f$ maps elements from set $A$ (the domain) to set $B$ (the codomain)."
For an input $x \in A$, the unique output in $B$ is denoted by $f(x)$.

**What could go wrong:** Students sometimes mistakenly think $f(x)$ means $f$ multiplied by $x$. It does not! It's function notation, indicating that $x$ is the input to the function named $f$.

### Step 5: Domain and Range

**Plain English:**
*   The **domain** is the complete collection of all possible inputs that the function can accept. What numbers or values are allowed to be put into the machine?
*   The **range** is the complete collection of all possible outputs that the function can produce. What numbers or values can come out of the machine?

**Concrete Example:**
*   Consider the function $f(x) = 2x + 3$.
    *   **Domain:** Can you multiply any real number by 2 and add 3? Yes. So, the domain is all real numbers.
    *   **Range:** As $x$ takes on all real numbers, $2x+3$ can also take on any real number. So, the range is all real numbers.
*   Consider the function $g(x) = \sqrt{x}$.
    *   **Domain:** Can you take the square root of any real number? No, you can't take the square root of a negative number and get a real number result. So, the domain is all non-negative real numbers ($x \ge 0$).
    *   **Range:** The square root symbol $\sqrt{}$ typically denotes the principal (non-negative) square root. So, the outputs will always be non-negative real numbers ($g(x) \ge 0$).

**Formal/Mathematical Version:**
*   **Domain:** The set of all values for which the function is defined. For a function $f: A \to B$, $A$ is the domain.
*   **Range:** The set of all actual output values produced by the function. It is a subset of the codomain $B$. Formally, the range is $\{f(x) \mid x \in A\}$.

**What could go wrong:** Students often confuse the range with the codomain. The codomain is the *target set* of possible outputs, while the range is the *actual set* of outputs that are achieved. For example, if $f: \mathbb{Z} \to \mathbb{Z}$ (integers to integers) where $f(x)=2x$, the codomain is $\mathbb{Z}$, but the range is only the even integers.

### Step 6: Visualizing Functions (Graphing)

**Plain English:** We can draw a picture of a function on a coordinate plane. Each point on the graph represents an (input, output) pair. The input is the x-coordinate, and the output is the y-coordinate.

**Concrete Example:** For $f(x) = 2x + 3$:
*   If input $x=0$, output $f(0) = 3$. Plot point $(0, 3)$.
*   If input $x=1$, output $f(1) = 5$. Plot point $(1, 5)$.
*   If input $x=-1$, output $f(-1) = 1$. Plot point $(-1, 1)$.
When you plot all such points, they form a straight line.

**Formal/Mathematical Version:** The graph of a function $f$ is the set of all ordered pairs $(x, f(x))$ in the Cartesian plane, where $x$ is in the domain of $f$.
$$\text{Graph}(f) = \{ (x, y) \mid y = f(x) \text{ and } x \in \text{Domain}(f) \}$$

**What could go wrong:** Not every curve on a graph represents a function. This leads to the "Vertical Line Test". If you can draw any vertical line that intersects the graph at more than one point, then that graph does *not* represent a function (because a single input $x$ would have multiple outputs $y$).

## 5. Worked examples — multiple, with every step shown

Let's work through some examples to solidify these ideas.

### Example 1: Basic Evaluation

**Problem:** Given the function $f(x) = 3x - 7$, find $f(4)$ and $f(-2)$.

**Given:** The function $f(x) = 3x - 7$.
**Want:** The output of the function when the input is $4$, and when the input is $-2$.

**Step 1:** Understand what $f(4)$ means.
$f(4)$ means we need to substitute $x=4$ into the function's rule.
**Step 2:** Substitute $x=4$ into the expression for $f(x)$.
$$f(4) = 3(4) - 7$$
We replace every instance of $x$ with $4$.
**Step 3:** Perform the arithmetic operations according to the order of operations.
$$f(4) = 12 - 7$$
First, multiplication $3 \times 4 = 12$.
**Step 4:** Complete the subtraction.
$$f(4) = 5$$
The final result for $f(4)$.

**Step 5:** Understand what $f(-2)$ means.
$f(-2)$ means we need to substitute $x=-2$ into the function's rule.
**Step 6:** Substitute $x=-2$ into the expression for $f(x)$.
$$f(-2) = 3(-2) - 7$$
We replace every instance of $x$ with $-2$. Be careful with negative numbers.
**Step 7:** Perform the arithmetic operations.
$$f(-2) = -6 - 7$$
First, multiplication $3 \times (-2) = -6$.
**Step 8:** Complete the subtraction.
$$f(-2) = -13$$
The final result for $f(-2)$.

**Answer:**
$\boxed{f(4) = 5}$
$\boxed{f(-2) = -13}$

**Reflection:** This example was straightforward, focusing on correct substitution and arithmetic. The main trick is careful handling of negative numbers during multiplication and subtraction.

### Example 2: Finding Input for a Given Output

**Problem:** Given the function $g(x) = x^2 + 1$, find the value(s) of $x$ for which $g(x) = 10$.

**Given:** The function $g(x) = x^2 + 1$.
**Want:** The input value(s) $x$ that produce an output of $10$.

**Step 1:** Set the function's output equal to the desired value.
$$g(x) = 10$$
We are given the output, so we set the entire function expression equal to $10$.
**Step 2:** Substitute the expression for $g(x)$ into the equation.
$$x^2 + 1 = 10$$
This translates the problem into an algebraic equation we can solve for $x$.
**Step 3:** Isolate the $x^2$ term.
$$x^2 = 10 - 1$$
Subtract $1$ from both sides of the equation.
$$x^2 = 9$$
Simplify the right side.
**Step 4:** Solve for $x$ by taking the square root of both sides.
$$\sqrt{x^2} = \sqrt{9}$$
To undo squaring, we take the square root.
$$x = \pm 3$$
Remember that when solving $x^2=k$, there are always two solutions (a positive and a negative root), unless $k=0$. Both $3^2=9$ and $(-3)^2=9$.

**Answer:**
$\boxed{x = 3 \text{ or } x = -3}$

**Reflection:** This example highlights that a single output can correspond to multiple inputs, which is perfectly valid for a function. The main trick was remembering both the positive and negative square roots.

### Example 3: Domain Restrictions

**Problem:** Determine the domain of the function $h(x) = \frac{1}{x-5}$.

**Given:** The function $h(x) = \frac{1}{x-5}$.
**Want:** The set of all possible input values $x$ for which $h(x)$ is defined as a real number.

**Step 1:** Identify potential mathematical operations that restrict the domain.
In general, there are two main restrictions for real-valued functions:
1.  Division by zero.
2.  Taking the square root (or any even root) of a negative number.
In this function, we have a fraction, which means we must avoid division by zero.
**Step 2:** Set the denominator equal to zero to find values that are *not* allowed.
$$x - 5 = 0$$
The denominator cannot be zero.
**Step 3:** Solve the equation for $x$.
$$x = 5$$
This means if $x$ is $5$, the denominator becomes $0$, and the function is undefined.
**Step 4:** State the domain by excluding the problematic value(s).
The domain is all real numbers *except* $x=5$.

**Answer:**
The domain of $h(x)$ is $\boxed{\{x \in \mathbb{R} \mid x \neq 5\}}$, or in interval notation, $\boxed{(-\infty, 5) \cup (5, \infty)}$.

**Reflection:** This example emphasizes understanding common mathematical restrictions. Division by zero is a fundamental concept that always restricts the domain.

### Example 4: Function with Multiple Operations and Domain

**Problem:** Given the function $k(t) = \frac{\sqrt{t+2}}{t-1}$, find $k(2)$ and determine its domain.

**Given:** The function $k(t) = \frac{\sqrt{t+2}}{t-1}$.
**Want:** The output of the function when $t=2$, and the domain of the function.

---
**Part A: Find $k(2)$**

**Step 1:** Substitute $t=2$ into the function's expression.
$$k(2) = \frac{\sqrt{2+2}}{2-1}$$
Replace every instance of $t$ with $2$.
**Step 2:** Simplify the numerator.
$$k(2) = \frac{\sqrt{4}}{2-1}$$
Inside the square root, $2+2=4$.
**Step 3:** Calculate the square root in the numerator.
$$k(2) = \frac{2}{2-1}$$
The principal square root of $4$ is $2$.
**Step 4:** Simplify the denominator.
$$k(2) = \frac{2}{1}$$
Subtract $1$ from $2$.
**Step 5:** Perform the division.
$$k(2) = 2$$
The final result for $k(2)$.

---
**Part B: Determine the Domain**

**Step 1:** Identify all potential restrictions on the input $t$.
We have two issues to consider:
1.  A square root: The expression inside the square root cannot be negative.
2.  A fraction: The denominator cannot be zero.
**Step 2:** Address the square root restriction.
The expression inside the square root is $t+2$.
$$t+2 \ge 0$$
This means $t$ must be greater than or equal to $-2$.
$$t \ge -2$$
**Step 3:** Address the denominator restriction.
The denominator is $t-1$.
$$t-1 \neq 0$$
This means $t$ cannot be $1$.
$$t \neq 1$$
**Step 4:** Combine all restrictions.
We need $t \ge -2$ AND $t \neq 1$.
This means $t$ can be any number from $-2$ upwards, but it must skip $1$.

**Answer:**
$\boxed{k(2) = 2}$
The domain of $k(t)$ is $\boxed{\{t \in \mathbb{R} \mid t \ge -2 \text{ and } t \neq 1\}}$, or in interval notation, $\boxed{[-2, 1) \cup (1, \infty)}$.

**Reflection:** This example combines multiple domain restrictions, requiring the student to consider each one independently and then find the intersection of all valid conditions. It also reinforced careful evaluation with fractions and roots.

## 6. Common mistakes and traps

1.  **Confusing $f(x)$ with multiplication:** Many beginners read $f(x)$ as "$f$ times $x$". Remember, $f(x)$ is function notation, meaning "the output of function $f$ when the input is $x$."
2.  **Violating the uniqueness condition:** Thinking that a relation where one input leads to multiple outputs is a function. For example, $x = y^2$ is NOT a function of $x$ because if $x=4$, $y$ could be $2$ or $-2$. A single input $x=4$ gives two outputs.
3.  **Forgetting domain restrictions:** Failing to exclude values that would cause division by zero or taking the even root of a negative number. Always check denominators and expressions under even roots.
4.  **Incorrectly determining the range:** The range is the set of *actual* outputs, not just any value in the codomain. This is a subtle but important distinction. For example, $f(x) = x^2$ has a range of $[0, \infty)$, even though the codomain might be all real numbers.
5.  **Algebraic errors during substitution:** Careless arithmetic, especially with negative numbers or fractions, when evaluating $f(x)$ for a specific $x$.
6.  **Misinterpreting variables:** Confusing which variable is the independent variable (input) and which is the dependent variable (output), especially in real-world problems or when equations are not in the standard $y=f(x)$ form.

## 7. Textbook-precise explanation

A **function** is a relation between a set of inputs and a set of permissible outputs with the property that each input is related to exactly one output.

More formally, a function $f$ from a set $A$ to a set $B$, denoted $f: A \to B$, is a rule that assigns to each element $x$ in $A$ exactly one element $y$ in $B$.

*   The set $A$ is called the **domain** of the function. It represents all possible input values for which the function is defined.
*   The set $B$ is called the **codomain** of the function. It is the set of all possible values that the output could *potentially* take.
*   The unique element $y$ in $B$ that is assigned to a given $x$ in $A$ is denoted by $f(x)$ (read "f of x"), and is called the **value of $f$ at $x$** or the **image of $x$ under $f$**.
*   The **range** of $f$ is the subset of the codomain $B$ consisting of all actual values $f(x)$ for $x$ in the domain $A$. That is, Range$(f) = \{f(x) \mid x \in A\}$.

A relation is a function if and only if it passes the **Vertical Line Test**: no vertical line intersects its graph at more than one point.

**Example:** Consider the function $f: \mathbb{R} \to \mathbb{R}$ defined by $f(x) = x^2$.
*   Domain: $\mathbb{R}$ (all real numbers).
*   Codomain: $\mathbb{R}$ (all real numbers).
*   Range: $[0, \infty)$ (all non-negative real numbers), because $x^2$ is never negative.

(See: Stewart, *Calculus: Early Transcendentals*, 9th ed., Chapter 1, Section 1.1; or Larson, *Calculus*, 11th ed., Chapter P, Section P.3)

## 8. ASCII diagrams

Here's a simple ASCII diagram illustrating the concept of input, output, and mapping:

```text
+-------------------+
|      FUNCTION     |
|      (Rule)       |
|  "Square the input|
|  and add 1"       |
+-------------------+
       ^       |
       |       |
       |       V
   +-------+  +-------+
   | Input |  | Output|
   |   x   |  |  f(x) |
   +-------+  +-------+
       |           ^
       |           |
       V           |
+-------------------+
|  Example Values   |
|-------------------|
| x = 2   ---------> f(2) = 2^2 + 1 = 5  (Mapping: 2 -> 5)
| x = -3  ---------> f(-3) = (-3)^2 + 1 = 10 (Mapping: -3 -> 10)
| x = 0   ---------> f(0) = 0^2 + 1 = 1  (Mapping: 0 -> 1)
+-------------------+

This diagram illustrates how specific inputs (x) are processed by the
function's rule to produce unique outputs (f(x)). Each arrow represents
a mapping from an input to its corresponding output.
```

## 9. Memory technique — never forget this

1.  **Mnemonic/Visual Hook:** Think of a "Function Machine" with a single conveyor belt for inputs and a single conveyor belt for outputs.
    *   **Input goes in one side.**
    *   **The machine (the rule) processes it.**
    *   **Output comes out the other side.**
    *   **Crucial Rule:** If you put the *exact same item* in, you *always* get the *exact same item* out. It's perfectly consistent. (This hammers home the "one output per input" rule).
    *   It's okay if two different inputs give the same output (e.g., $x^2$ machine: input $2 \to 4$, input $-2 \to 4$). The machine is still consistent for *each* input.

2.  **Formulas/Facts to Overlearn:**
    *   **The Definition:** A function assigns *each input* to *exactly one output*.
    *   **Notation:** $f(x)$ means "the output of function $f$ when the input is $x$". It is NOT multiplication.
    *   **Domain Restrictions:** Denominators cannot be zero; expressions under even roots cannot be negative.

3.  **Spaced-Repetition Schedule:**
    *   **Day 1:** Review this lesson, work through all examples, and try the self-check questions.
    *   **Day 3:** Briefly review the definition, notation, domain rules, and the "Function Machine" analogy. Re-do one self-check question.
    *   **Day 7:** Review the definition, domain/range concepts, and the vertical line test. Re-do two self-check questions.
    *   **Day 16:** Review common mistakes, the formal definition, and try to explain the concept of a function in your own words without looking at notes.
    *   **Day 35:** Attempt to derive the domain of a complex function (e.g., $f(x) = \frac{\sqrt{x-3}}{x^2-9}$) from first principles.

4.  **First-Principles Re-derivation Pathway:**
    If you forget the core idea of a function, rebuild it from:
    *   **What is a relationship?** Just two things connected.
    *   **What makes it a *special* relationship (a function)?** The idea of *prediction* and *consistency*. If I know the first thing, I *always* know the second thing with certainty.
    *   **How do we express that consistency?** "For every input, there is exactly one output."
    *   **What are the practical implications?** If there's a fraction, the denominator can't be zero (otherwise, the output is undefined, violating "exactly one output"). If there's an even root, the inside can't be negative (same reason).

## 10. Connections — what this leads to

The concept of a function is perhaps the most fundamental idea in all of higher mathematics. Mastering it unlocks virtually every subsequent topic:

*   **Graphing and Visualizing Data:** Functions are the basis for understanding how to plot equations on a coordinate plane, leading to linear functions, quadratic functions, exponential functions, trigonometric functions, etc.
*   **Algebraic Manipulation:** Working with functions involves heavy use of algebraic skills, including substitution, solving equations, and simplifying expressions.
*   **Calculus:** The entire field of calculus (derivatives and integrals) is built upon the concept of functions. Derivatives measure rates of change of functions, and integrals measure accumulation under function curves.
*   **Advanced Algebra:** Understanding inverse functions, composite functions, and transformations of functions.
*   **Precalculus and Trigonometry:** Detailed study of various families of functions (polynomial, rational, exponential, logarithmic, trigonometric) and their properties.
*   **Linear Algebra:** Functions are generalized to linear transformations, which are central to solving systems of equations, computer graphics, and machine learning.
*   **Differential Equations:** Equations involving functions and their derivatives, used to model dynamic systems in physics, biology, and engineering.
*   **Discrete Mathematics:** Functions are crucial in computer science for understanding algorithms, data structures, and computational complexity.
*   **Statistics and Probability:** Probability distributions are functions, and statistical models often involve fitting functions to data.

Without a solid grasp of what a function is, none of these advanced topics can be truly understood. It is the language through which mathematical relationships are described and analyzed.

## 11. Self-check questions

1.  Is the relation defined by the set of ordered pairs $\{(1, 5), (2, 7), (3, 5), (4, 9)\}$ a function? Explain why or why not.
2.  Given the function $h(x) = x^2 - 3x + 1$, find $h(-1)$ and $h(0)$.
3.  Determine the domain of the function $g(x) = \frac{x+2}{\sqrt{x-3}}$. Express your answer in interval notation.
4.  If $f(x) = 5x - 8$ and $f(a) = 17$, what is the value of $a$?
5.  Consider a function that relates the side length $s$ of a square to its area $A$. Write this relationship using function notation, and state its domain and range.