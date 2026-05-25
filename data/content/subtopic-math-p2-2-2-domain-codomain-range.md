## What it is
A function is a mathematical machine that takes an input and produces an output. The **domain** is the complete set of valid inputs you are allowed to feed into the machine. The **codomain** is the broad category or set of all *potential* outputs the machine is designed to produce (like "real numbers"), while the **range** is the set of actual outputs the machine *specifically* produces when you feed it every possible input from the domain.

## Why it matters
In computer science, defining the domain and codomain is called "type hinting" (e.g., a function that takes an `integer` and returns a `float`); getting this wrong causes software crashes. In physics and aerospace, the domain represents physical reality: you cannot have a negative mass, and a rocket's time of flight cannot be a complex number. Later in mathematics, you will study invertible functions; a function can only be inverted if its range perfectly matches its codomain (a condition called being "surjective"). 

## When to study it
You must already understand:
1. **Basic Set Theory:** What a set is, elements ($\in$), subsets ($\subseteq$), and interval notation (e.g., $[0, \infty)$).
2. **Algebraic Manipulation:** Solving linear and quadratic equations, and working with inequalities.
3. **The concept of a function:** Understanding $f(x)$ as a rule mapping an input $x$ to an output $y$.

If you cannot solve $x^2 - 4 \ge 0$ for $x$, return to algebraic inequalities before proceeding.

## How to study it (step by step)
1. **Identify the "Danger Zones":** Spend 20 minutes finding the domains of various functions by looking for the two cardinal sins of real algebra: dividing by zero, and taking an even root of a negative number.
2. **Translate constraints to sets:** Practice writing the valid $x$-values using interval notation and set-builder notation. 
3. **Define the Codomain:** Understand that the codomain is usually stated upfront by the author of the problem (e.g., "Let $f$ be a function from Reals to Reals"). If it isn't stated, assume it is $\mathbb{R}$ (all real numbers).
4. **Calculate the Range algebraically:** Set $y = f(x)$. Solve for $x$ in terms of $y$. The domain of this new inverted relation often gives you the range of the original function.
5. **Visualize via Graphing:** Sketch functions on a Cartesian plane. The domain is the "shadow" the graph casts on the $x$-axis. The range is the "shadow" it casts on the $y$-axis.

## Key ideas, with intuition

**1. The Mapping Notation**
When you see $f: A \to B$, this is the ultimate blueprint of the function. 
* $A$ is the **domain**.
* $B$ is the **codomain**.
It tells you exactly what goes in and what category of thing comes out.

**2. Range $\subseteq$ Codomain**
The range is always a subset of the codomain. It can be smaller, or it can be equal, but it can never exceed the codomain. If your codomain is $\mathbb{R}$, but your function is $f(x) = x^2$, your range is only $[0, \infty)$. The negative numbers were in the codomain (the theoretical target), but not in the range (the actual hits).

**3. Domain Restrictions**
Unless specified otherwise, the domain is the largest possible set of real numbers that doesn't break math. 
* **Fractions:** Denominator $\neq 0$.
* **Even Roots:** Radicand $\ge 0$.
* **Logarithms:** Argument $> 0$.

## Worked example
Let a function $f: \mathbb{R} \to \mathbb{R}$ be defined by the rule, where possible:
$$f(x) = \frac{1}{\sqrt{x - 3}}$$

**Step 1: Find the Domain**
Look for danger zones. We have a square root, so the inside must be non-negative: $x - 3 \ge 0$.
We also have a fraction. The denominator cannot be zero, so $\sqrt{x - 3} \neq 0$, which means $x - 3 \neq 0$.
Combining these, we require $x - 3 > 0$, which implies $x > 3$.
*Domain:* $(3, \infty)$. (Note: Because the domain is not all of $\mathbb{R}$, the strict notation is $f: (3, \infty) \to \mathbb{R}$).

**Step 2: Identify the Codomain**
The problem stated $f: \mathbb{R} \to \mathbb{R}$. The second $\mathbb{R}$ is the codomain. 
*Codomain:* $\mathbb{R}$.

**Step 3: Find the Range**
Let $y = \frac{1}{\sqrt{x - 3}}$. 
First, note that the principal square root is always positive, and $1$ is positive. Therefore, $y > 0$. The range cannot contain zero or negative numbers.
Now, solve for $x$ to find any other restrictions on $y$:
$$y^2 = \frac{1}{x - 3}$$
$$x - 3 = \frac{1}{y^2}$$
$$x = \frac{1}{y^2} + 3$$
This equation is valid for any $y$ except $y = 0$. Since we already established $y > 0$, there are no further restrictions.
*Range:* $(0, \infty)$.

*Reflection:* The domain was restricted by the physical limits of the algebraic operations. The range was found by looking at the logical outputs of those operations and confirming via algebraic inversion. The range $(0, \infty)$ is a strict subset of the codomain $\mathbb{R}$.

## Diagrams

```text
THE ARCHERY ANALOGY

Domain (A)                Codomain (B)
(The Arrows)              (The Target Board)
                             _______
  x_1 --------------------->|       |
                            |  y_1  |  <-- Range
  x_2 --------------------->|  y_2  |  (The actual holes
                            |_______|   in the board)
  x_3 ___________/          
                            y_3 (Missed / Not mapped to)
                            y_4 (Missed / Not mapped to)
```

## Memory technique — remember this forever
**1. The Archery Mnemonic:**
* **Domain:** The arrows in your quiver (what you start with).
* **Codomain:** The physical target board (what you are aiming at).
* **Range:** The actual holes you punched in the board (what you actually hit).

**2. Facts to overlearn:**
* $f: X \to Y \implies X = \text{Domain}, Y = \text{Codomain}$.
* $\text{Range} \subseteq \text{Codomain}$.
* Denominators $\neq 0$; Even Radicands $\ge 0$.

**3. Spaced-repetition schedule:**
Review this archery analogy and the worked example at 1 day, 3 days, 7 days, 16 days, and 35 days.

**4. First principles pathway:**
If you forget the definitions, remember that a function is formally a set of ordered pairs $(x, y)$. 
* The domain is simply the set of all $x$'s that exist in your pairs. 
* The range is the set of all $y$'s that exist in your pairs. 
* The codomain is the universe you decided the $y$'s would live in before you started making pairs.

## Common mistakes
1. **Confusing Codomain and Range:** Assuming that because a function outputs real numbers, its range is all real numbers. $f(x) = x^2$ outputs real numbers (codomain), but never outputs negative numbers (range).
2. **Forgetting the principal root:** When evaluating $y = \sqrt{x}$, students often think the range includes negative numbers because $(-2)^2 = 4$. But the square root function is defined to only return the positive root. The range of $y = \sqrt{x}$ is $[0, \infty)$.
3. **Checking domain AFTER simplifying:** If $f(x) = \frac{x^2 - 4}{x - 2}$, students will simplify this to $f(x) = x + 2$ and claim the domain is all real numbers. This is fatal. The domain must be evaluated on the *original* function. $x = 2$ is undefined.

## Self-check
1. What is the domain of $f(x) = \frac{x}{x^2 - 9}$?
2. Find the domain and range of $g(x) = \sqrt{5 - x}$.
3. If a function is defined as $h: \mathbb{Z} \to \mathbb{Z}$ (where $\mathbb{Z}$ is integers) and $h(x) = 2x$, what is the domain, codomain, and range? Is the range equal to the codomain?