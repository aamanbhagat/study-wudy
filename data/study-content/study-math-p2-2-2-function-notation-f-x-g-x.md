## 1. What it is — in plain English

Imagine you have a special machine. You put something into it, the machine does its work, and then something comes out. This machine always follows the same rule: if you put the exact same thing in, you'll always get the exact same thing out. It's predictable.

In mathematics, a "function" is just like one of these predictable machines. And "function notation" is simply the special way we write down the name of the machine, what we put into it, and what comes out. It's a shorthand, a label, that makes it super clear what we're talking about.

When you see something like $f(x)$, it's not "f times x". Think of it as: "the output from machine 'f' when 'x' is the input." The letter 'f' is just the name of our machine (we could call it 'g' or 'h' or 'cost' or 'temperature' instead), and the 'x' in the parentheses is what we're feeding into it. The entire $f(x)$ represents the result, the output, that pops out of the machine.

So, if you have a rule like "take a number, double it, then add 5", and you name this rule "f", then $f(x)$ would be the result of applying that rule to $x$. If you put in $x=3$, the machine "f" doubles 3 (to get 6) and adds 5, so the output $f(3)$ would be 11. It's a compact, powerful way to describe cause and effect.

## 2. Why it matters — real-world applications

Function notation is not just an abstract mathematical concept; it's a fundamental language used across science, engineering, and technology to model and understand the world. Without it, describing complex relationships would be cumbersome and ambiguous.

1.  **Physics & Aerospace Engineering (Trajectory Calculation):** When launching a rocket or calculating the flight path of an airplane, engineers need to know the position of the object at any given time. We can express this using function notation. For example, $h(t)$ might represent the height of the rocket at time $t$, and $v(t)$ could be its velocity at time $t$. A trajectory model might involve $h(t) = -4.9t^2 + v_0 t + h_0$, where $v_0$ is initial velocity and $h_0$ is initial height. NASA engineers constantly evaluate these functions to ensure precise orbital mechanics and safe landings.

2.  **Economics & Business (Cost Analysis):** Businesses use functions to model costs, revenue, and profit. For instance, a manufacturing company like Tesla might define $C(q)$ as the total cost of producing $q$ cars. This function would include fixed costs (like factory rent) and variable costs (like materials and labor per car). They might also have a revenue function $R(q)$ for selling $q$ cars. Function notation allows them to easily calculate $C(1000)$ to find the cost of producing 1000 cars, or to find the profit $P(q) = R(q) - C(q)$.

3.  **Computer Science & Machine Learning (Algorithm Outputs):** In programming, functions are direct analogs of mathematical functions. A machine learning model, such as one used by Google for image recognition, can be thought of as a complex function. If you input an image $I$ into a classification model, the output might be $P(\text{cat} | I)$, representing the probability that the image $I$ contains a cat. Similarly, a search engine's ranking algorithm could be $R(query, webpage)$, returning a score for how relevant a webpage is to a given query.

4.  **Environmental Science (Population Growth):** Ecologists use functions to model population changes. For example, $P(t)$ might represent the population of a certain species (like deer in a national park) at time $t$ years. A common model is exponential growth, $P(t) = P_0 e^{kt}$, where $P_0$ is the initial population and $k$ is the growth rate. This helps conservationists predict future populations and manage ecosystems.

5.  **Medicine (Drug Dosage and Concentration):** Pharmacologists study how the concentration of a drug in a patient's bloodstream changes over time. $C(t)$ could represent the concentration of a drug (in mg/L) in the blood $t$ hours after administration. A typical model might be $C(t) = A e^{-kt}$, where $A$ is the initial concentration and $k$ is the elimination rate. This function is crucial for determining appropriate dosages and timing to maintain therapeutic levels without toxicity.

## 3. Prerequisites — what you must know first

Before diving deep into function notation, ensure you have a solid grasp of these foundational concepts:

*   **Variables and Expressions:** Understanding what a variable (like $x$, $y$, $t$) represents, and how to form algebraic expressions (e.g., $2x+3$, $t^2 - 5$).
*   **Equations:** Familiarity with equations like $y = 2x+3$, where one variable's value depends on another.
*   **Input and Output:** The basic idea that in many relationships, one value (input) determines another value (output).
*   **Basic Algebraic Operations:** Proficiency in addition, subtraction, multiplication, division, and working with exponents.
*   **Order of Operations (PEMDAS/BODMAS):** Knowing the correct sequence to perform calculations in an expression (Parentheses/Brackets, Exponents/Orders, Multiplication and Division, Addition and Subtraction).

## 4. The core idea — step by step

Let's break down function notation piece by piece, building our understanding from the ground up.

### Step 1: The "Machine" Analogy

**Plain English:** A function is like a reliable machine or a recipe. You put an ingredient (input) in, and it consistently produces a specific dish (output) according to its fixed instructions. For any given ingredient, there's only one possible dish it can make.

**Small Concrete Example:** Think of a bread toaster. You put a slice of bread in, press the lever, and out comes toast. Every time you put *a slice of bread* in and set it to the same setting, you get *a piece of toast*. You don't get a muffin or burnt charcoal one time and perfect toast the next, for the exact same input and setting.

**Formal/Mathematical Version:** A function $f$ is a relation between a set of inputs (called the domain) and a set of possible outputs (called the codomain) such that each input is related to *exactly one* output.

**What could go wrong:** Thinking a function is like a magic box that can give different results for the same input. If you put $x=5$ into a function, you must always get the same output. If it sometimes gives $10$ and sometimes $12$ for $x=5$, it's not a function.

### Step 2: Naming the Machine

**Plain English:** Just like you'd call your kitchen appliance a "toaster" or a "blender," we give our mathematical machines names. Common names are $f$, $g$, or $h$, but you can use any letter.

**Small Concrete Example:** If you have two different machines, one that toasts and one that blends, you'd call them "toaster" and "blender." In math, we might have a function named $f$ and another named $g$.

**Formal/Mathematical Version:** The letter (e.g., $f$, $g$, $h$) preceding the parentheses is the *name* of the function itself. It's an identifier, not a variable to be multiplied.

**What could go wrong:** Confusing the function's name (`f`) with a variable that holds a value. `f` by itself doesn't have a numerical value in the same way `x` does. It represents the *process* or *rule*.

### Step 3: The Input Slot

**Plain English:** The letter inside the parentheses, like the `(x)` in `f(x)`, tells you what you are putting *into* the machine. It's the ingredient, the raw material. This is often called the "input variable."

**Small Concrete Example:** If our toaster machine is named `T`, and we put "bread" into it, we might write `T(bread)`. Here, "bread" is the input. In math, if our function is named $f$, and we put the number $3$ into it, we write $f(3)$. Here, $3$ is the input.

**Formal/Mathematical Version:** In $f(x)$, the variable $x$ is the *independent variable* or the *argument* of the function. It represents any valid input from the function's domain.

**What could go wrong:** Thinking that `(x)` means multiplication. This is the most common initial mistake. Remember, it's an "input slot," not a multiplication symbol.

### Step 4: The Output

**Plain English:** The entire expression $f(x)$ *as a whole* represents the result that comes out of the machine after it has processed the input. It's the finished product, the outcome. This is often called the "output value" or "dependent variable."

**Small Concrete Example:** If our toaster `T` takes "bread" and produces "toast," then `T(bread) = toast`. The "toast" is the output. In math, if our function $f$ takes $3$ and produces $11$, then $f(3) = 11$. The $11$ is the output. We often say $y = f(x)$, meaning $y$ *is* the output of function $f$ when $x$ is the input.

**Formal/Mathematical Version:** The notation $f(x)$ denotes the *value* of the function $f$ at the input $x$. It is the unique element in the codomain that corresponds to $x$. This value is typically what we refer to as $y$ in coordinate geometry, so $y = f(x)$.

**What could go wrong:** Not understanding that $f(x)$ *is* a value. It's not just a label; it's the numerical result of applying the function's rule to $x$. Forgetting this makes it hard to use $f(x)$ in equations or calculations.

### Step 5: Defining the Machine's Rule

**Plain English:** Every machine has internal instructions or a rule that tells it how to transform the input into the output. This rule is what defines the function.

**Small Concrete Example:** Our toaster's rule might be "apply heat for 2 minutes." A mathematical function's rule might be "take the input, square it, then add 1." We write this as $f(x) = x^2 + 1$. Here, the expression $x^2 + 1$ is the rule.

**Formal/Mathematical Version:** The rule of the function is typically given by an algebraic expression involving the input variable. For example, $f(x) = x^2 + 1$ defines the rule for function $f$.

**What could go wrong:** Misinterpreting the rule, especially when it involves multiple operations, negative numbers, or fractions. Always follow the order of operations carefully.

### Step 6: Evaluating the Function

**Plain English:** "Evaluating the function" means finding the specific output when you put a *specific number* or *expression* into the input slot. You simply replace every instance of the input variable in the rule with the specific value you're feeding in.

**Small Concrete Example:** If $f(x) = x^2 + 1$, and we want to find $f(3)$, we replace every $x$ with $3$: $f(3) = (3)^2 + 1 = 9 + 1 = 10$. So, $f(3)=10$.

**Formal/Mathematical Version:** To evaluate $f(a)$ for a specific value $a$ (where $a$ is in the domain of $f$), substitute $a$ for every occurrence of $x$ in the algebraic expression that defines $f(x)$.

**What could go wrong:** Making calculation errors during substitution. A common error is not substituting into *all* instances of the input variable, or incorrectly handling signs, especially with negative numbers or exponents. For instance, if $f(x) = -x^2$, then $f(2) = -(2)^2 = -4$, but $f(-2) = -(-2)^2 = -(4) = -4$. The negative sign *outside* the square is important.

### Step 7: Using Different Names and Inputs

**Plain English:** You can have many different functions (machines), and you can use different letters for their names ($f, g, h, \dots$). Also, the input variable doesn't *have* to be $x$. It can be $t$ (for time), $r$ (for radius), $z$, or anything else, depending on the context. The rules of function notation remain the same regardless of the letters used.

**Small Concrete Example:**
*   $f(x) = 2x + 1$ (A function named $f$ with input $x$)
*   $g(t) = t^2 - 3$ (A function named $g$ with input $t$)
*   $h(z) = \frac{1}{z}$ (A function named $h$ with input $z$)
All these work exactly the same way. If you want $g(5)$, you substitute $5$ for $t$: $g(5) = (5)^2 - 3 = 25 - 3 = 22$.

**Formal/Mathematical Version:** The choice of function name and input variable is arbitrary (within convention). $f(x)$ and $g(t)$ both represent functions where the output depends on the input, and the notation communicates this relationship.

**What could go wrong:** Getting confused by the change of letters. Students sometimes think $g(t)$ implies a different *type* of function or rule than $f(x)$. The letter is just a label; the underlying concept is identical.

## 5. Worked examples — multiple, with every step shown

Let's walk through several examples to solidify your understanding. Pay close attention to each step and the explanation.

### Example 1: Basic Evaluation

**Problem:** Given the function $f(x) = 3x - 7$, find $f(5)$.

**Given:** The function $f(x) = 3x - 7$.
**Want:** The output of the function when the input is $5$, denoted as $f(5)$.

**Step-by-step Solution:**

1.  $$f(x) = 3x - 7$$
    This is the definition of our function. It tells us the rule: "take the input, multiply it by 3, then subtract 7."

2.  $$f(5) = 3(5) - 7$$
    To find $f(5)$, we substitute the input value $5$ for every occurrence of $x$ in the function's rule. The parentheses around the $5$ emphasize that it's being multiplied.

3.  $$f(5) = 15 - 7$$
    Perform the multiplication first, following the order of operations. $3 \times 5 = 15$.

4.  $$f(5) = 8$$
    Finally, perform the subtraction.

**Answer:** $\boxed{f(5) = 8}$

**Reflection:** This was a straightforward substitution. The key is to replace *all* instances of the input variable ($x$) with the given value ($5$) and then carefully follow the order of operations.

---

### Example 2: Evaluation with a Negative Input and Exponents

**Problem:** Given the function $g(t) = t^2 - 4t + 10$, find $g(-3)$.

**Given:** The function $g(t) = t^2 - 4t + 10$.
**Want:** The output of the function when the input is $-3$, denoted as $g(-3)$.

**Step-by-step Solution:**

1.  $$g(t) = t^2 - 4t + 10$$
    This is the definition of our function. The rule involves squaring the input, multiplying it by $-4$, and then adding $10$.

2.  $$g(-3) = (-3)^2 - 4(-3) + 10$$
    Substitute the input value $-3$ for every occurrence of $t$ in the function's rule. It's crucial to use parentheses around the negative number to ensure correct squaring and multiplication.

3.  $$g(-3) = 9 - (-12) + 10$$
    Perform the exponentiation: $(-3)^2 = (-3) \times (-3) = 9$.
    Perform the multiplication: $-4 \times (-3) = +12$. Note that subtracting a negative number becomes addition. So this term becomes $+12$.

4.  $$g(-3) = 9 + 12 + 10$$
    Rewrite the expression to clarify the operation. Subtracting a negative is equivalent to adding a positive.

5.  $$g(-3) = 21 + 10$$
    Perform the additions from left to right: $9 + 12 = 21$.

6.  $$g(-3) = 31$$
    Complete the final addition.

**Answer:** $\boxed{g(-3) = 31}$

**Reflection:** This example highlights the importance of careful substitution with negative numbers and strict adherence to the order of operations, especially when dealing with exponents and multiplication. A common mistake would be calculating $-3^2$ as $-9$ instead of $9$.

---

### Example 3: Evaluation with an Algebraic Expression as Input

**Problem:** Given the function $h(z) = \frac{2z+1}{z-3}$, find $h(a+2)$.

**Given:** The function $h(z) = \frac{2z+1}{z-3}$.
**Want:** The output of the function when the input is the expression $a+2$, denoted as $h(a+2)$.

**Step-by-step Solution:**

1.  $$h(z) = \frac{2z+1}{z-3}$$
    This is the definition of our function. The rule involves a rational expression where the input $z$ appears in both the numerator and the denominator.

2.  $$h(a+2) = \frac{2(a+2)+1}{(a+2)-3}$$
    Substitute the entire expression $(a+2)$ for every occurrence of $z$ in the function's rule. Use parentheses to ensure the entire expression is treated as a single input.

3.  $$h(a+2) = \frac{2a + 4 + 1}{a + 2 - 3}$$
    In the numerator, distribute the $2$: $2 \times a = 2a$ and $2 \times 2 = 4$.
    In the denominator, remove the parentheses as there's nothing to distribute, and prepare to combine like terms.

4.  $$h(a+2) = \frac{2a + 5}{a - 1}$$
    Combine the constant terms in the numerator: $4 + 1 = 5$.
    Combine the constant terms in the denominator: $2 - 3 = -1$.

**Answer:** $\boxed{h(a+2) = \frac{2a+5}{a-1}}$

**Reflection:** This example demonstrates that inputs don't always have to be numbers; they can be other algebraic expressions. The process is the same: substitute the entire input expression into the function's rule and then simplify the resulting expression using algebraic techniques. Pay attention to distribution and combining like terms.

---

### Example 4: Multiple Functions and Nested Evaluation (Composition)

**Problem:** Given two functions, $f(x) = x+1$ and $g(x) = x^2$, find:
    a) $f(g(2))$
    b) $g(f(2))$

**Given:** Two functions: $f(x) = x+1$ and $g(x) = x^2$.
**Want:** The result of nested evaluations for two different orders.

**Step-by-step Solution for a) $f(g(2))$:**

1.  $$f(g(2))$$
    We want to evaluate $f$ at the input $g(2)$. This means we first need to find the value of $g(2)$.

2.  $$g(x) = x^2$$
    Recall the definition of function $g$.

3.  $$g(2) = (2)^2$$
    Substitute $2$ for $x$ in the function $g$.

4.  $$g(2) = 4$$
    Calculate the value. This is the output of $g$ when the input is $2$. Now, this value ($4$) becomes the input for function $f$.

5.  $$f(x) = x+1$$
    Recall the definition of function $f$.

6.  $$f(g(2)) = f(4)$$
    Substitute the result from step 4 ($g(2)=4$) into function $f$.

7.  $$f(4) = (4)+1$$
    Substitute $4$ for $x$ in the function $f$.

8.  $$f(4) = 5$$
    Calculate the value.

**Answer for a):** $\boxed{f(g(2)) = 5}$

**Step-by-step Solution for b) $g(f(2))$:**

1.  $$g(f(2))$$
    We want to evaluate $g$ at the input $f(2)$. This means we first need to find the value of $f(2)$.

2.  $$f(x) = x+1$$
    Recall the definition of function $f$.

3.  $$f(2) = (2)+1$$
    Substitute $2$ for $x$ in the function $f$.

4.  $$f(2) = 3$$
    Calculate the value. This is the output of $f$ when the input is $2$. Now, this value ($3$) becomes the input for function $g$.

5.  $$g(x) = x^2$$
    Recall the definition of function $g$.

6.  $$g(f(2)) = g(3)$$
    Substitute the result from step 4 ($f(2)=3$) into function $g$.

7.  $$g(3) = (3)^2$$
    Substitute $3$ for $x$ in the function $g$.

8.  $$g(3) = 9$$
    Calculate the value.

**Answer for b):** $\boxed{g(f(2)) = 9}$

**Reflection:** This example introduces the concept of function composition, where the output of one function becomes the input for another. It's crucial to work from the "inside out" – evaluate the innermost function first, then use its result as the input for the next outer function. Notice that $f(g(2)) \neq g(f(2))$, which is generally true for function composition.

## 6. Common mistakes and traps

Students often fall into predictable traps when first learning function notation. Being aware of these can help you avoid them.

1.  **`f(x)` means `f * x`**: This is the most common initial misconception. The parentheses in function notation do *not* imply multiplication. They indicate that $x$ is the input to the function named $f$.
2.  **Incorrect substitution for negative inputs**: When substituting a negative number, forgetting to use parentheses can lead to sign errors, especially with exponents (e.g., `-3^2` is `-9`, but `(-3)^2` is `9`).
3.  **Ignoring order of operations**: After substitution, the resulting expression must be simplified according to PEMDAS/BODMAS. Forgetting this can lead to incorrect calculations (e.g., in $f(x) = 2x+3$, if $x=4$, $f(4)$ is $2(4)+3 = 8+3 = 11$, not $2(7)=14$).
4.  **Not substituting into *all* instances of the variable**: If $f(x) = x^2 - 5x$, and you need $f(2)$, you must replace *both* $x$'s: $f(2) = (2)^2 - 5(2)$, not just one of them.
5.  **Confusing the function's name with its value**: The letter $f$ (or $g$, $h$) itself is not a variable that holds a numerical value. It's the name of the rule. Only $f(x)$ (the output) holds a value.
6.  **Getting confused by different input variable names**: Thinking that $f(t)$ is fundamentally different from $f(x)$. The letter used for the input variable is arbitrary; it's just a placeholder. The rule of the function remains the same.

## 7. Textbook-precise explanation

In advanced mathematics, the concept of a function and its notation is defined with rigorous precision.

A **function** $f$ is a relation from a set $X$ (called the **domain**) to a set $Y$ (called the **codomain**) such that for every element $x$ in $X$, there is exactly one element $y$ in $Y$ with which $x$ is associated.

**Function Notation:**
If $f$ is a function and $x$ is an element of its domain, then **$f(x)$** (read as "f of x") denotes the unique element in the codomain $Y$ that $f$ associates with $x$. This element $f(x)$ is called the **value of $f$ at $x$** or the **image of $x$ under $f$**.

The set of all possible values $f(x)$ as $x$ varies throughout the domain $X$ is called the **range** of $f$. The range is always a subset of the codomain $Y$.

We often write $y = f(x)$ to indicate that the dependent variable $y$ is determined by the independent variable $x$ according to the rule defined by the function $f$.

**Formally:**
Let $f: X \to Y$ be a function.
For any $x \in X$, $f(x)$ is the unique element in $Y$ corresponding to $x$.
The domain of $f$ is $D_f = X$.
The range of $f$ is $R_f = \{f(x) \mid x \in X\}$, which is a subset of $Y$.

**Example:**
If $f: \mathbb{R} \to \mathbb{R}$ is defined by $f(x) = x^2$.
Here, $X = \mathbb{R}$ (the set of all real numbers) is the domain.
$Y = \mathbb{R}$ (the set of all real numbers) is the codomain.
For any input $x$, the output $f(x)$ is $x^2$.
The range of this function is $R_f = [0, \infty)$, because squaring any real number always results in a non-negative number.

(See: Stewart, Calculus, 9e, Chapter 1, Section 1.1 "Four Ways to Represent a Function" for a detailed discussion of function definitions and notation.)

## 8. ASCII diagrams

Here are a couple of ASCII diagrams to visualize function notation.

### Diagram 1: The Function Machine

This diagram illustrates the "machine" analogy, showing input going in and output coming out according to a defined rule.

```text
      +---------------------------------+
      |                                 |
      |          Function 'f'           |
      |       (The "Rule/Process")      |
      |                                 |
      |  Input (x) -------------------->|  Apply the rule f()  |----> Output (f(x))
      |                                 |
      +---------------------------------+
               ^                                   ^
               |                                   |
           Independent Variable                Dependent Variable
                                                (often called 'y')
```

### Diagram 2: Mapping from Domain to Range

This diagram shows how each element in the domain is mapped to exactly one element in the range.

```text
  Domain (X)             Function f             Range (Y)
  +-----------+                                 +-----------+
  |    -2     | ----- f(-2) = 4 --------------->|     4     |
  |     0     | ----- f(0) = 0 ---------------> |     0     |
  |     1     | ----- f(1) = 1 ---------------> |     1     |
  |     3     | ----- f(3) = 9 ---------------> |     9     |
  +-----------+                                 +-----------+

  (Example: If f(x) = x^2, then -2 maps to 4, 0 maps to 0, etc.)
```

## 9. Memory technique — never forget this

1.  **Specific Mnemonic/Visual Hook:**
    Think of `f(x)` as a *function-box*. The letter `f` is the *brand name* of the box (e.g., "Blender," "Toaster"). The `(x)` part is the *input slot* where you drop in your ingredient `x`. The *entire expression* `f(x)` is the *finished product* that comes out of the box. It's the result of the box doing its work on `x`.
    So, `f` = brand, `(x)` = input slot, `f(x)` = output product.

2.  **The 1-3 Formulas/Facts You MUST Overlearn:**
    *   **`f(x)` means "the value of function `f` at input `x`."** It is *not* `f` multiplied by `x`.
    *   **`f(x)` IS the output value.** It's often interchangeable with `y` in equations like `y = f(x)`.
    *   **To evaluate `f(a)`, substitute `a` for *every* `x`** (or whatever the input variable is) in the function's definition, then simplify using order of operations.

3.  **Spaced-Repetition Schedule:**
    To embed this notation deeply into your long-term memory, review it at these intervals:
    *   **1 Day:** After completing this lesson.
    *   **3 Days:** Review examples and try a few new practice problems.
    *   **7 Days:** Quick check, perhaps explain it to an imaginary friend.
    *   **16 Days:** Attempt a more complex problem involving function notation.
    *   **35 Days:** Revisit the core concepts and definitions.

4.  **First-Principles Re-derivation Pathway:**
    If you ever forget what $f(x)$ truly means, go back to the fundamental idea of a "process" or "machine":
    *   What does a process do? It takes something *in* and produces something *out*.
    *   How do we identify *which* specific process we're talking about? By giving it a *name* (like $f$).
    *   How do we specify *what* we're putting into the process? By indicating the *input* (like $x$).
    *   What is the *result* of the process? The *output*.
    Putting these together: the *name* of the process, with the *input* specified, *is* the *output*. This naturally leads to `f(input) = output`, which is precisely what $f(x)$ represents.

## 10. Connections — what this leads to

Mastering function notation is a critical gateway skill. It unlocks vast areas of mathematics and its applications:

*   **Graphing Functions:** The coordinate plane is often described with `y = f(x)`. Understanding function notation is essential to plot points `(x, f(x))` and visualize the behavior of functions.
*   **Domain and Range:** Function notation provides the framework for formally defining and determining the set of all valid inputs (domain) and possible outputs (range) of a function.
*   **Function Composition (`f(g(x))`):** This topic, briefly touched upon in the examples, involves feeding the output of one function into another. It's crucial for modeling sequential processes and is fundamental in calculus (e.g., Chain Rule).
*   **Inverse Functions (`f⁻¹(x)`):** Understanding how to "undo" a function's operation relies entirely on the concept of input and output represented by function notation.
*   **Transformations of Functions:** Shifting, stretching, compressing, and reflecting graphs (e.g., $f(x+c)$, $f(x)+c$, $cf(x)$) are all expressed and understood through function notation.
*   **Calculus:** Limits, derivatives, and integrals are all defined and calculated using function notation. For instance, the derivative of $f(x)$ is denoted $f'(x)$, and the definite integral is $\int_a^b f(x) dx$. Without solid function notation skills, calculus is impenetrable.
*   **Differential Equations:** These equations describe rates of change and are written using function notation (e.g., $y' = f(x,y)$ or $\frac{dy}{dx} = f(x)$).
*   **Discrete Mathematics:** Sequences are often defined using function notation, like $a_n = f(n)$.
*   **Abstract Algebra:** Functions are generalized into mappings and homomorphisms between algebraic structures, where notation like $\phi: G \to H$ is used.
*   **Computer Science:** Functions in programming languages are direct implementations of mathematical functions, taking inputs and returning outputs.

## 11. Self-check questions

Test your understanding with these questions. Do not look for answers until you have thoroughly attempted each one.

1.  Given the function $f(x) = x^2 - 3x + 2$:
    a) Find $f(0)$.
    b) Find $f(4)$.
    c) Find $f(-1)$.
    d) Find $f(\frac{1}{2})$.

2.  If $g(t) = \frac{t-5}{t+2}$:
    a) Find $g(8)$.
    b) Find $g(-1)$.
    c) What value of $t$ would make $g(t)$ undefined? Explain why.

3.  Consider the function $h(r) = \sqrt{2r+7}$.
    a) Find $h(9)$.
    b) Find $h(-3)$.
    c) Can you find $h(-4)$? If not, why not? What does this tell you about the domain of $h(r)$?

4.  Let $f(x) = x+3$ and $g(x) = x^2 - 2x$.
    a) Find $f(g(1))$.
    b) Find $g(f(1))$.
    c) Find $f(g(x))$ in terms of $x$.

5.  A company's daily profit, $P$, in dollars, is a function of the number of items, $n$, sold. The function is given by $P(n) = -0.01n^2 + 5n - 300$.
    a) Calculate $P(100)$. What does this value represent in the context of the problem?
    b) Calculate $P(0)$. What does this value represent?
    c) Is it possible for $P(n)$ to be negative? If so, what would that mean for the company?