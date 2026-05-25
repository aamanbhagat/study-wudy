## 1. What it is — in plain English

Imagine you have a special machine. This machine takes something in, does a specific job, and then spits something out. This is pretty much what a "function" is in mathematics: a rule that takes an input and gives you exactly one output.

Now, let's talk about the parts of this machine's world. The **Domain** is simply the set of *all possible inputs* that you are allowed to feed into your machine. If your machine is a coffee maker, the domain might be "coffee beans" – you can't put rocks or sand into it, only things it's designed to process.

The **Codomain** is the set of *all possible outputs* that the machine *could* theoretically produce. For our coffee maker, the codomain might be "all hot beverages" – coffee, tea, hot chocolate, etc., even if your specific machine only makes coffee. It's the general category of stuff that *might* come out.

Finally, the **Range** is the set of *all actual outputs* that the machine *does* produce when you feed it all the allowed inputs from its domain. If you put every type of coffee bean into your coffee maker (its domain), the range would be "all types of coffee" it actually makes. Notice that the range is usually a smaller, more specific collection than the codomain, but it can be the same. The range is a subset of the codomain.

## 2. Why it matters — real-world applications

Understanding domain, codomain, and range isn't just an academic exercise; it's fundamental to how we model and solve problems in the real world.

1.  **Engineering and Design (e.g., Bridge Stress Analysis):** When designing a bridge, engineers use functions to model how stress ($S$) on a support beam changes with the load ($L$) applied to it.
    *   **Domain:** The domain for $L$ would be all *realistic* loads the bridge might experience, from zero up to the maximum design load (e.g., $0 \le L \le \text{MaxLoad}$). You can't have negative loads, and you can't exceed the structural limit.
    *   **Codomain:** The codomain for $S$ might be "all non-negative real numbers" ($\mathbb{R}_{\ge 0}$), representing any possible stress value.
    *   **Range:** The range would be the *actual* stress values the beam *will* experience under its design loads, which must stay within the material's yield strength (e.g., $0 \le S \le \text{YieldStrength}$). If the range exceeds the yield strength, the bridge fails, so understanding this relationship is critical for safety.

2.  **Computer Science and Machine Learning (e.g., Image Recognition):** In machine learning, an image recognition model is a function that takes an image as input and outputs a classification (e.g., "cat," "dog," "car").
    *   **Domain:** The domain is the set of all possible input images (e.g., $256 \times 256$ pixel images with RGB color values).
    *   **Codomain:** The codomain might be a predefined list of all possible categories the model is trained to recognize (e.g., \{'cat', 'dog', 'bird', 'car', 'truck', 'boat'\}).
    *   **Range:** The range would be the *actual* classifications the model produces for a given set of input images. If the model is only ever fed pictures of cats and dogs, its range for that specific test set would be \{'cat', 'dog'\}, which is a subset of the full codomain. Understanding the range helps evaluate the model's performance and identify biases or limitations.

3.  **Physics and Aerospace (e.g., Projectile Motion):** When calculating the trajectory of a rocket, functions describe its height or velocity over time.
    *   **Domain:** For a function $h(t)$ representing height, the domain for time $t$ would be from launch ($t=0$) until it hits the ground ($h(t)=0$, $t>0$). You can't have negative time, and the flight ends when it lands.
    *   **Codomain:** The codomain for height might be "all real numbers" ($\mathbb{R}$), or more practically, "all non-negative real numbers" ($\mathbb{R}_{\ge 0}$) since height can't be negative.
    *   **Range:** The range would be the actual heights the rocket achieves during its flight, from $0$ up to its maximum altitude and back to $0$. This range is critical for ensuring the rocket clears obstacles or reaches a desired target altitude.

## 3. Prerequisites — what you must know first

Before diving deep into domain, codomain, and range, ensure you have a solid grasp of these foundational concepts:

*   **Sets and Set Notation:** Understanding what a set is (a collection of distinct objects) and how to represent them (e.g., $\{1, 2, 3\}$, $\mathbb{R}$, interval notation like $(-\infty, 5]$).
*   **Variables:** The concept of a symbol (like $x$ or $y$) representing an unknown or changing quantity.
*   **Basic Algebraic Operations:** Addition, subtraction, multiplication, division, exponentiation, and how they apply to variables and numbers.
*   **Inequalities:** How to express relationships like "greater than" ($>$) or "less than or equal to" ($\le$), and how to solve simple inequalities.
*   **Number Systems:** Familiarity with natural numbers ($\mathbb{N}$), integers ($\mathbb{Z}$), rational numbers ($\mathbb{Q}$), and especially real numbers ($\mathbb{R}$).
*   **The Concept of a Function:** What a function is (a rule that assigns each input to exactly one output) and how to read function notation (e.g., $f(x)$).

## 4. The core idea — step by step

Let's break down these concepts one by one, building intuition and then formalizing it.

### Step 1: The Function as a Process

**Plain English:** A function is like a recipe or a machine. You give it an ingredient (input), it follows a specific set of instructions (the function's rule), and it produces a dish (output). Crucially, for any given input, it *always* produces the *same, single* output.

**Small Concrete Example:**
Consider the function "double the number and add one."
If the input is 3, the output is $2 \times 3 + 1 = 7$.
If the input is -5, the output is $2 \times (-5) + 1 = -9$.

**Formal/Mathematical Version:**
A function $f$ from a set $A$ to a set $B$, denoted $f: A \to B$, is a rule that assigns to each element $x$ in $A$ exactly one element $y$ in $B$. We write $y = f(x)$.

**What could go wrong:** If your "rule" allows one input to produce two different outputs (e.g., "give me a number whose square is $x$"), it's not a function. For example, if $x=4$, the output could be 2 or -2. This is not a function.

### Step 2: The Domain (Allowed Inputs)

**Plain English:** The domain is the complete collection of all inputs that are "legal" or "sensible" to feed into your function machine. These are the values for which the function's rule makes mathematical sense and is defined.

**Small Concrete Example:**
Consider the function $f(x) = \frac{1}{x-2}$.
*   If $x=5$, $f(5) = \frac{1}{5-2} = \frac{1}{3}$. This is a valid output.
*   If $x=2$, $f(2) = \frac{1}{2-2} = \frac{1}{0}$. Division by zero is undefined in mathematics. So, $x=2$ is NOT an allowed input.
The domain would be all real numbers *except* 2.

**Formal/Mathematical Version:**
For a function $f: A \to B$, the set $A$ is called the **domain** of $f$. It is the set of all values $x$ for which $f(x)$ is defined.
In set-builder notation:
$$ \text{Domain}(f) = \{x \mid f(x) \text{ is defined}\} $$
For $f(x) = \frac{1}{x-2}$, the domain is $\{x \in \mathbb{R} \mid x \ne 2\}$, or in interval notation, $(-\infty, 2) \cup (2, \infty)$.

**What could go wrong:** Forgetting to exclude values that cause division by zero, or values that lead to the square root of a negative number (for real-valued functions), or the logarithm of a non-positive number. These are the most common restrictions.

### Step 3: The Codomain (Possible Outputs)

**Plain English:** The codomain is the declared "universe" of all possible outputs that the function *could* produce. It's like announcing, "This machine makes drinks," before specifying *which* drinks it actually makes. It sets the stage for where the outputs will live. It's a statement about the *type* of values you expect.

**Small Concrete Example:**
Consider the function $f(x) = x^2$.
If we define $f: \mathbb{R} \to \mathbb{R}$, then the codomain is the set of all real numbers ($\mathbb{R}$). This means we are saying the outputs *will be* real numbers.
It's true that $x^2$ always produces a real number. It's also true that $x^2$ never produces a negative number. But the codomain just says "real numbers" as the general category.

**Formal/Mathematical Version:**
For a function $f: A \to B$, the set $B$ is called the **codomain** of $f$. It is the set of all potential output values.
$$ \text{Codomain}(f) = B $$
For $f(x)=x^2$ defined as $f: \mathbb{R} \to \mathbb{R}$, the codomain is $\mathbb{R}$.

**What could go wrong:** Confusing the codomain with the range. The codomain is a *declaration* of where outputs *might* fall, while the range is the *actual* set of outputs. The codomain can be much larger than the range. For example, if $f(x) = \text{number of children in a family}$, the codomain could be $\mathbb{Z}_{\ge 0}$ (non-negative integers), but the range might only be $\{0, 1, 2, 3, 4\}$ in a specific study.

### Step 4: The Range (Actual Outputs)

**Plain English:** The range is the *actual* collection of all outputs that the function produces when you feed it *every single allowed input* from its domain. It's the specific set of items that *actually come out* of the machine.

**Small Concrete Example:**
Consider the function $f(x) = x^2$ with domain $\mathbb{R}$.
*   If $x=3$, $f(3)=9$.
*   If $x=-3$, $f(-3)=9$.
*   If $x=0$, $f(0)=0$.
Notice that $x^2$ can never be a negative number. All outputs will be zero or positive.
So, the range is all non-negative real numbers.

**Formal/Mathematical Version:**
For a function $f: A \to B$, the **range** of $f$ (sometimes called the image of $f$) is the set of all actual output values $f(x)$ for all $x$ in the domain $A$.
$$ \text{Range}(f) = \{f(x) \mid x \in A\} $$
For $f(x)=x^2$ with domain $\mathbb{R}$, the range is $\{y \in \mathbb{R} \mid y \ge 0\}$, or in interval notation, $[0, \infty)$.

**What could go wrong:** Incorrectly determining the maximum or minimum output values, or overlooking asymptotes or discontinuities that limit the range. It requires careful analysis of the function's behavior.

### Step 5: The Relationship: Range is a Subset of Codomain

**Plain English:** Think of it this way: the codomain is a big box where all the possible outputs *could* live. The range is a smaller, more specific collection of items *inside* that box – the items that the function actually produces. Every item in the range *must* also be in the codomain.

**Small Concrete Example:**
Function: $f(x) = x^2$
Domain: $\mathbb{R}$ (all real numbers)
Codomain: $\mathbb{R}$ (all real numbers)
Range: $[0, \infty)$ (all non-negative real numbers)

Here, the range $[0, \infty)$ is indeed a subset of the codomain $\mathbb{R}$. All non-negative real numbers are, by definition, real numbers.

**Formal/Mathematical Version:**
For any function $f: A \to B$, it is always true that $\text{Range}(f) \subseteq \text{Codomain}(f)$.
This means that every element in the range of $f$ is also an element of the codomain of $f$.

**What could go wrong:** Thinking that the range *must* be equal to the codomain. While it sometimes is (for "surjective" or "onto" functions, which you'll learn about later), it generally is not.

## 5. Worked examples — multiple, with every step shown

Let's work through several examples to solidify your understanding.

### Example 1: Simple Polynomial Function

**Problem:** Find the domain, codomain, and range of the function $f(x) = 2x - 3$, assuming it maps real numbers to real numbers.

**Given:** The function $f(x) = 2x - 3$. The problem states it maps real numbers to real numbers, which implies the codomain.
**Want:** Domain, Codomain, Range.

**Step 1: Determine the Domain.**
The function $f(x) = 2x - 3$ involves only multiplication and subtraction.
There are no operations that would make the function undefined for any real number input (e.g., no division by zero, no square roots of negative numbers).
Therefore, any real number can be an input.

$$ \text{Domain}(f) = \mathbb{R} $$
This means the domain is the set of all real numbers. In interval notation, $(-\infty, \infty)$.

**Step 2: Determine the Codomain.**
The problem explicitly states that the function maps real numbers to real numbers. This means the set of all *possible* outputs is the set of real numbers.

$$ \text{Codomain}(f) = \mathbb{R} $$
This is the set of all real numbers.

**Step 3: Determine the Range.**
To find the range, we need to see what values $f(x)$ can actually take.
Let $y = f(x)$, so $y = 2x - 3$.
We want to see what values $y$ can take. Since $x$ can be any real number, let's try to express $x$ in terms of $y$:
$$ y = 2x - 3 $$
Add 3 to both sides:
$$ y + 3 = 2x $$
Divide by 2:
$$ x = \frac{y+3}{2} $$
Since $x$ can be any real number, and for any real number $y$, we can find a corresponding real number $x$ (because $\frac{y+3}{2}$ is always a real number), this means $y$ can take on any real value.
Therefore, the function $f(x) = 2x-3$ can produce any real number as an output.

$$ \text{Range}(f) = \mathbb{R} $$
In interval notation, $(-\infty, \infty)$.

**Final Answer:**
*   **Domain:** $\mathbb{R}$ or $(-\infty, \infty)$
*   **Codomain:** $\mathbb{R}$ or $(-\infty, \infty)$
*   **Range:** $\mathbb{R}$ or $(-\infty, \infty)$

**Reflection:** This was an easy example because linear functions (of the form $y=mx+b$ where $m \ne 0$) generally have a domain and range of all real numbers. The codomain was given in the problem statement.

### Example 2: Rational Function

**Problem:** Find the domain, codomain, and range of the function $g(x) = \frac{x+1}{x-4}$, assuming it maps real numbers to real numbers.

**Given:** The function $g(x) = \frac{x+1}{x-4}$. It maps real numbers to real numbers.
**Want:** Domain, Codomain, Range.

**Step 1: Determine the Domain.**
A rational function (a fraction with polynomials) is undefined when its denominator is zero.
So, we must ensure $x-4 \ne 0$.
$$ x - 4 \ne 0 $$
Add 4 to both sides:
$$ x \ne 4 $$
Therefore, the domain is all real numbers except 4.

$$ \text{Domain}(g) = \{x \in \mathbb{R} \mid x \ne 4\} $$
In interval notation, $(-\infty, 4) \cup (4, \infty)$.

**Step 2: Determine the Codomain.**
The problem states that the function maps real numbers to real numbers.

$$ \text{Codomain}(g) = \mathbb{R} $$
This is the set of all real numbers.

**Step 3: Determine the Range.**
Let $y = g(x)$, so $y = \frac{x+1}{x-4}$.
To find the range, we want to see what values $y$ can take. Let's try to solve for $x$ in terms of $y$:
$$ y = \frac{x+1}{x-4} $$
Multiply both sides by $(x-4)$:
$$ y(x-4) = x+1 $$
Distribute $y$:
$$ yx - 4y = x+1 $$
We want to isolate $x$. Move all terms with $x$ to one side and terms without $x$ to the other side:
$$ yx - x = 4y + 1 $$
Factor out $x$ from the left side:
$$ x(y-1) = 4y + 1 $$
Divide by $(y-1)$ to solve for $x$:
$$ x = \frac{4y+1}{y-1} $$
Now, for $x$ to be defined as a real number, the denominator $(y-1)$ cannot be zero.
$$ y - 1 \ne 0 $$
$$ y \ne 1 $$
This means that $y$ can be any real number except 1. So, the function $g(x)$ can produce any real number as an output, except for 1.

$$ \text{Range}(g) = \{y \in \mathbb{R} \mid y \ne 1\} $$
In interval notation, $(-\infty, 1) \cup (1, \infty)$.

**Final Answer:**
*   **Domain:** $\{x \in \mathbb{R} \mid x \ne 4\}$ or $(-\infty, 4) \cup (4, \infty)$
*   **Codomain:** $\mathbb{R}$ or $(-\infty, \infty)$
*   **Range:** $\{y \in \mathbb{R} \mid y \ne 1\}$ or $(-\infty, 1) \cup (1, \infty)$

**Reflection:** Rational functions often have restrictions in both their domain (due to division by zero) and their range (due to horizontal asymptotes, which correspond to values $y$ cannot reach). The algebraic manipulation to solve for $x$ in terms of $y$ is a common technique for finding the range.

### Example 3: Square Root Function

**Problem:** Find the domain, codomain, and range of the function $h(x) = \sqrt{x+5}$, assuming it maps real numbers to real numbers.

**Given:** The function $h(x) = \sqrt{x+5}$. It maps real numbers to real numbers.
**Want:** Domain, Codomain, Range.

**Step 1: Determine the Domain.**
For a square root function to produce a real number output, the expression under the square root (the radicand) must be non-negative (greater than or equal to zero).
So, we must have $x+5 \ge 0$.
$$ x+5 \ge 0 $$
Subtract 5 from both sides:
$$ x \ge -5 $$
Therefore, the domain is all real numbers greater than or equal to -5.

$$ \text{Domain}(h) = \{x \in \mathbb{R} \mid x \ge -5\} $$
In interval notation, $[-5, \infty)$.

**Step 2: Determine the Codomain.**
The problem states that the function maps real numbers to real numbers.

$$ \text{Codomain}(h) = \mathbb{R} $$
This is the set of all real numbers.

**Step 3: Determine the Range.**
Let $y = h(x)$, so $y = \sqrt{x+5}$.
We know that for the function to be defined, $x \ge -5$.
The square root symbol $\sqrt{\cdot}$ by convention denotes the *principal* (non-negative) square root.
This means that $\sqrt{x+5}$ will always produce a value that is greater than or equal to zero.
$$ y = \sqrt{x+5} \ge 0 $$
Can $y$ take on *any* non-negative value?
If $y=0$, then $\sqrt{x+5}=0 \implies x+5=0 \implies x=-5$, which is in the domain.
If $y=1$, then $\sqrt{x+5}=1 \implies x+5=1 \implies x=-4$, which is in the domain.
If $y=10$, then $\sqrt{x+5}=10 \implies x+5=100 \implies x=95$, which is in the domain.
It appears that for any non-negative $y$, we can find a corresponding $x$ in the domain.
So, the range is all non-negative real numbers.

$$ \text{Range}(h) = \{y \in \mathbb{R} \mid y \ge 0\} $$
In interval notation, $[0, \infty)$.

**Final Answer:**
*   **Domain:** $\{x \in \mathbb{R} \mid x \ge -5\}$ or $[-5, \infty)$
*   **Codomain:** $\mathbb{R}$ or $(-\infty, \infty)$
*   **Range:** $\{y \in \mathbb{R} \mid y \ge 0\}$ or $[0, \infty)$

**Reflection:** Square root functions introduce domain restrictions because the radicand must be non-negative. They also inherently restrict the range to non-negative values because the principal square root is always non-negative.

### Example 4: Function with Limited Domain

**Problem:** Find the domain, codomain, and range of the function $k(x) = x^2 - 4x + 3$, given that its domain is specified as $D = \{x \in \mathbb{R} \mid 0 \le x \le 3\}$, and it maps real numbers to real numbers.

**Given:** The function $k(x) = x^2 - 4x + 3$. The specified domain is $D = [0, 3]$. It maps real numbers to real numbers.
**Want:** Domain, Codomain, Range.

**Step 1: Determine the Domain.**
The domain is explicitly given in the problem statement. We don't need to find restrictions based on the function's form because the problem *defines* the domain for us.

$$ \text{Domain}(k) = \{x \in \mathbb{R} \mid 0 \le x \le 3\} $$
In interval notation, $[0, 3]$.

**Step 2: Determine the Codomain.**
The problem states that the function maps real numbers to real numbers.

$$ \text{Codomain}(k) = \mathbb{R} $$
This is the set of all real numbers.

**Step 3: Determine the Range.**
This function is a parabola, $k(x) = x^2 - 4x + 3$. Its graph is a U-shape.
To find the range over a *limited* domain, we need to consider:
1.  The values of the function at the endpoints of the domain.
2.  The value of the function at its vertex, if the vertex falls within the domain.

First, let's find the vertex of the parabola $k(x) = ax^2 + bx + c$. The x-coordinate of the vertex is $x_v = -\frac{b}{2a}$.
For $k(x) = x^2 - 4x + 3$, $a=1$ and $b=-4$.
$$ x_v = -\frac{-4}{2(1)} = \frac{4}{2} = 2 $$
The x-coordinate of the vertex is $x=2$. This value *is* within our given domain $[0, 3]$.
Now, calculate the function's value at the vertex:
$$ k(2) = (2)^2 - 4(2) + 3 = 4 - 8 + 3 = -1 $$
So, the minimum value of the function in this domain is -1.

Next, calculate the function's values at the endpoints of the domain:
At $x=0$:
$$ k(0) = (0)^2 - 4(0) + 3 = 3 $$
At $x=3$:
$$ k(3) = (3)^2 - 4(3) + 3 = 9 - 12 + 3 = 0 $$
Comparing the values: $k(2)=-1$, $k(0)=3$, $k(3)=0$.
The smallest value is -1, and the largest value is 3.
Since the function is continuous over this interval, it will take on all values between the minimum and maximum.

$$ \text{Range}(k) = [-1, 3] $$

**Final Answer:**
*   **Domain:** $[0, 3]$
*   **Codomain:** $\mathbb{R}$ or $(-\infty, \infty)$
*   **Range:** $[-1, 3]$

**Reflection:** When a domain is explicitly given, especially a restricted interval, the process for finding the range changes. We must evaluate the function at the endpoints of the interval and at any critical points (like vertices for parabolas) that fall within that interval.

## 6. Common mistakes and traps

1.  **Confusing Codomain and Range:** This is the most frequent mistake. Remember, the codomain is the *declared set of possible outputs*, while the range is the *actual set of outputs* produced by the function. The range is always a subset of the codomain.
2.  **Forgetting Domain Restrictions:** Overlooking common restrictions for real-valued functions:
    *   Division by zero (e.g., $f(x) = 1/x \implies x \ne 0$).
    *   Even roots of negative numbers (e.g., $f(x) = \sqrt{x} \implies x \ge 0$).
    *   Logarithms of non-positive numbers (e.g., $f(x) = \ln x \implies x > 0$).
3.  **Incorrectly Determining Range for Complex Functions:** Forgetting to consider the *entire* domain when finding the range, especially for functions with asymptotes, turning points (vertices), or discontinuities.
4.  **Assuming Range is Always $\mathbb{R}$:** Just because a function's codomain is $\mathbb{R}$ doesn't mean its range is. Functions like $f(x) = x^2$ or $f(x) = \sin(x)$ have ranges that are proper subsets of $\mathbb{R}$.
5.  **Not Considering the Given Codomain:** If a problem specifies $f: A \to B$, then $B$ *is* the codomain by definition, even if the actual outputs (range) are a smaller subset. Don't try to "calculate" the codomain; it's usually stated or implied by context (e.g., "real-valued function").
6.  **Arithmetic Errors when Solving for $x$ in terms of $y$:** This is a common algebraic pitfall when trying to determine the range by expressing $x = f^{-1}(y)$. Any mistake in the algebra will lead to an incorrect range.

## 7. Textbook-precise explanation

Let $A$ and $B$ be non-empty sets. A **function** $f$ from $A$ to $B$, denoted $f: A \to B$, is a relation that associates each element $x$ in $A$ with exactly one element $y$ in $B$.

1.  The set $A$ is called the **domain** of the function $f$, denoted $\text{Dom}(f)$. It is the set of all permissible input values for $f$.
    $$ \text{Dom}(f) = A $$
    For a function defined by an algebraic expression without an explicitly stated domain, the domain is understood to be the largest subset of the real numbers for which the expression is defined and yields real number outputs. This is often referred to as the "natural domain."

2.  The set $B$ is called the **codomain** of the function $f$, denoted $\text{Codom}(f)$. It is the target set where the output values of $f$ are declared to reside.
    $$ \text{Codom}(f) = B $$
    Note that the codomain is part of the definition of the function itself.

3.  The **range** of the function $f$, also known as the image of $f$, denoted $\text{Ran}(f)$ or $\text{Im}(f)$, is the set of all actual output values $f(x)$ that the function produces when $x$ takes on every value in its domain $A$.
    $$ \text{Ran}(f) = \{y \in B \mid \exists x \in A \text{ such that } f(x) = y\} $$
    Equivalently,
    $$ \text{Ran}(f) = \{f(x) \mid x \in A\} $$
    It is a fundamental property that the range of a function is always a subset of its codomain: $\text{Ran}(f) \subseteq \text{Codom}(f)$.

(Reference: Adapted from definitions found in standard calculus textbooks such as *Stewart, Calculus: Early Transcendentals, 9e, §1.1* or *Larson & Edwards, Calculus, 11e, §1.1*.)

## 8. ASCII diagrams

Here's a diagram illustrating the relationship between domain, codomain, and range. Imagine the sets as bubbles and the function as arrows mapping elements from the domain to the codomain.

```text
       DOMAIN (A)          CODAMAIN (B)
     +-------------+     +-------------------+
     |             |     |                   |
     |   . x1      |     |      . y1         |
     |             |     |                   |
     |   . x2  ----|---->|      . y2         |
     |             |     |                   |
     |   . x3  ----|---->|      . y3         |
     |             |     |                   |
     |   . x4      |     |      . y4         |
     |             |     |                   |
     +-------------+     +-------------------+
             |                     ^
             |                     |
             |                     |
             |                     |
             |                     |
             |           +-------------------+
             |           |                   |
             |           |      . y1         |
             +---------> |                   |
                         |      . y3         |
                         |                   |
                         |      . y2         |
                         |                   |
                         +-------------------+
                               RANGE (f(A))
```

**Explanation of the Diagram:**

*   **Domain (A):** The left oval represents the set of all possible input values (x1, x2, x3, x4). These are the values you can "feed" into the function.
*   **Codomain (B):** The large right oval represents the set of all *declared possible* output values (y1, y2, y3, y4). This is the "universe" where the outputs are expected to land.
*   **Function (f):** The arrows show the mapping from each input in the domain to exactly one output in the codomain. Notice x1 maps to y1, x2 maps to y2, x3 maps to y3, and x4 also maps to y3.
*   **Range (f(A)):** The smaller, shaded oval *within* the codomain represents the *actual* outputs produced by the function (y1, y2, y3). Notice y4 is in the codomain but not in the range because no input from the domain maps to it. The range is a subset of the codomain.

## 9. Memory technique — never forget this

1.  **Mnemonic/Visual Hook:**
    Think of a **D**oor, a **C**ity, and a **R**oad.
    *   **D**omain: What can come through the **Door** (inputs)? Only allowed items.
    *   **C**odomain: The entire **City** (all possible destinations/outputs). It's the whole area where the outputs *could* be.
    *   **R**ange: The specific **Roads** taken within the city, leading to the *actual* destinations (outputs). The roads are *within* the city, but they don't cover every single spot in the city.

2.  **1-3 Formulas/Facts to Overlearn:**
    *   **Domain is about "What can I put IN?"** Look for division by zero, even roots of negatives, or logs of non-positives.
    *   **Range is about "What comes OUT?"** Consider the function's behavior (min/max, asymptotes) over its domain.
    *   **Range $\subseteq$ Codomain:** The actual outputs are always a subset of the declared possible outputs.

3.  **Spaced-Repetition Schedule:**
    *   **Today:** Review this lesson, work through all examples, and try to explain it to yourself aloud.
    *   **1 Day Later:** Briefly re-read the "What it is" and "Memory Technique" sections. Try the self-check questions.
    *   **3 Days Later:** Review the "Core Idea" and "Common Mistakes" sections. Redo one or two worked examples.
    *   **7 Days Later:** Attempt a new set of practice problems focusing on domain and range.
    *   **16 Days Later:** Review the "Textbook-precise explanation" and ensure you understand the formal definitions.
    *   **35 Days Later:** Create your own complex function and determine its domain, codomain, and range from scratch.

4.  **First-Principles Re-derivation Pathway:**
    If you forget how to find the domain or range, always go back to the fundamental definitions of operations:
    *   **Domain:**
        1.  Start with "all real numbers" ($\mathbb{R}$).
        2.  Ask: Are there any values of $x$ that would cause division by zero? If so, exclude them.
        3.  Ask: Are there any values of $x$ that would cause an even root of a negative number? If so, set the radicand $\ge 0$ and solve for $x$.
        4.  Ask: Are there any values of $x$ that would cause the logarithm of a non-positive number? If so, set the argument $> 0$ and solve for $x$.
        5.  Combine all restrictions.
    *   **Range:**
        1.  Start with $y = f(x)$.
        2.  Try to solve for $x$ in terms of $y$. If you can, any restrictions on $y$ that appear during this process (like division by zero in the expression for $x$) will be exclusions from the range.
        3.  If solving for $x$ is hard, analyze the function's graph or its behavior:
            *   What's the minimum possible output?
            *   What's the maximum possible output?
            *   Are there any horizontal asymptotes that $y$ approaches but never reaches?
            *   Consider the domain: how does the function behave at the boundaries of the domain?

## 10. Connections — what this leads to

A deep understanding of domain, codomain, and range is not just a standalone topic; it's a foundational pillar for nearly all advanced mathematics. Here's what it unlocks:

*   **Inverse Functions:** A function can only have an inverse if it is "one-to-one" (each input maps to a unique output) and "onto" (its range equals its codomain). Understanding domain and range is crucial for restricting functions to make them invertible and for defining the domain and range of their inverses.
*   **Continuity:** The concept of continuity (a function's graph having no breaks or jumps) is inherently tied to its domain. A function can only be continuous over an interval within its domain.
*   **Limits:** When studying limits, we often consider the behavior of a function as $x$ approaches a value. This value must be within the domain or at least a limit point of the domain.
*   **Calculus (Derivatives and Integrals):**
    *   **Derivatives:** The derivative of a function exists at points within its domain where it is smooth. The domain of the derivative function itself often differs from the original function's domain (e.g., $f(x) = \sqrt{x}$ has domain $[0, \infty)$, but $f'(x) = \frac{1}{2\sqrt{x}}$ has domain $(0, \infty)$).
    *   **Integrals:** Definite integrals are calculated over intervals within a function's domain.
*   **Optimization:** Finding maximum and minimum values of functions (a core application of calculus) requires understanding the function's behavior over its defined domain.
*   **Real Analysis:** This advanced field rigorously defines functions, continuity, limits, and convergence using precise set-theoretic definitions of domains, codomains, and ranges.
*   **Abstract Algebra:** In abstract algebra, functions (often called "maps" or "homomorphisms") between different algebraic structures (like groups or rings) explicitly use the concepts of domain and codomain to define their properties.
*   **Topology:** The study of topological spaces relies on functions (continuous maps) between these spaces, where the domain and codomain are the topological spaces themselves.

## 11. Self-check questions

1.  For the function $f(x) = \frac{3}{x^2 - 9}$, assuming it maps real numbers to real numbers:
    a. What is its domain?
    b. What is its codomain?
    c. What is its range?

2.  Consider the function $g(x) = \sqrt{2x - 10}$, assuming it maps real numbers to real numbers:
    a. What is its domain?
    b. What is its codomain?
    c. What is its range?

3.  A function $h(t)$ describes the height (in meters) of a ball thrown upwards, given by $h(t) = -5t^2 + 20t + 1$, where $t$ is time in seconds. The ball is thrown at $t=0$ and hits the ground at $t=4.05$ seconds (when $h(t) \approx 0$).
    a. What is the practical domain for this function?
    b. If the codomain is $\mathbb{R}$, what is the range of the function over its practical domain?

4.  Let a function $k: \{1, 2, 3\} \to \{a, b, c, d\}$ be defined by $k(1)=a$, $k(2)=c$, $k(3)=a$.
    a. What is the domain of $k$?
    b. What is the codomain of $k$?
    c. What is the range of $k$?

5.  Determine the domain and range of the function $m(x) = \frac{1}{\sqrt{x^2 - 4}}$, assuming it maps real numbers to real numbers.