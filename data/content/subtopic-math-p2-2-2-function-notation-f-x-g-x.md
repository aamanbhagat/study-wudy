## What it is
Function notation is a mathematical shorthand used to name a specific rule and explicitly identify its input variable. Instead of writing the generic equation $y = 2x + 3$, we write $f(x) = 2x + 3$ to label the rule "$f$" and show that "$x$" is the specific value being fed into that rule to produce an output.

## Why it matters
This notation is the bedrock of all advanced mathematics, physics, and computer science. In aerospace engineering, you rarely deal with a generic $y$; you deal with altitude as a function of time, $h(t)$, or thrust as a function of mass flow rate, $T(\dot{m})$. In machine learning, function notation allows us to cleanly chain operations, such as passing an input vector $x$ through multiple neural network layers, written as $f(g(x))$. It eliminates ambiguity about what depends on what.

## When to study it
You must already understand:
1. Basic algebraic expressions.
2. Evaluating expressions by substituting numerical values for variables.
3. The Cartesian coordinate system (the $x$-$y$ plane).

If you do not yet know how to substitute $x=3$ into $2x^2 - 4$ and simplify using the order of operations, you must master evaluating algebraic expressions before proceeding.

## How to study it (step by step)
1. **Translate equations to functions:** Take 5 standard equations (e.g., $y = 3x - 4$, $A = \pi r^2$) and rewrite them in function notation (e.g., $f(x) = 3x - 4$, $A(r) = \pi r^2$). Recognize that $f$ and $A$ are names, not variables.
2. **Practice direct numerical substitution:** Let $f(x) = x^2 - 2x$. Calculate $f(3)$, $f(0)$, and $f(-2)$. 
3. **Practice algebraic substitution:** Using the same $f(x)$, substitute expressions instead of numbers. Calculate $f(a)$, $f(2x)$, and $f(x-1)$. Expand and simplify the results.
4. **Relate to graphs:** Plot $f(x) = 2x + 1$ on a Cartesian plane. Explicitly label the vertical axis as $f(x)$ instead of $y$. Understand that the coordinate pair is now $(x, f(x))$.
5. **Combine functions:** Let $f(x) = x+1$ and $g(x) = 2x$. Find the algebraic expressions for $f(x) + g(x)$ and $f(g(x))$. 

## Key ideas, with intuition
* **The Name, The Input, The Output:** In the expression $f(x)$, $f$ is the name of the function (the machine). The $x$ is the placeholder for the input. The entire expression $f(x)$ represents the output. 
* **Dummy Variables:** The variable inside the parentheses is merely a placeholder, often called a "dummy variable." The rules $f(x) = x^2$ and $f(t) = t^2$ are mathematically identical. They describe the exact same machine: "take the input and square it."
* **Composability:** Function notation allows us to nest machines inside one another seamlessly. If $g(x)$ doubles a number and $f(x)$ adds one, then $f(g(x))$ means "double the number, then add one."
$$ f(g(x)) = f(2x) = 2x + 1 $$

## Worked example
Let $f(x) = 2x^2 - 3x + 1$. Evaluate and simplify $f(x+2)$.

**Step 1: Replace every instance of the dummy variable $x$ with the new input, $(x+2)$.** 
Always use parentheses to isolate the new input and prevent order-of-operations errors.
$$ f(x+2) = 2(x+2)^2 - 3(x+2) + 1 $$

**Step 2: Expand the squared binomial.**
$$ f(x+2) = 2(x^2 + 4x + 4) - 3(x+2) + 1 $$

**Step 3: Distribute the constants.**
$$ f(x+2) = 2x^2 + 8x + 8 - 3x - 6 + 1 $$

**Step 4: Combine like terms.**
$$ f(x+2) = 2x^2 + (8x - 3x) + (8 - 6 + 1) $$
$$ f(x+2) = 2x^2 + 5x + 3 $$

*Reflection:* This worked because $f(\text{input})$ is a blind substitution rule. The function $f$ does not care if the input is a number, a variable, or a complex algebraic expression. It simply takes *whatever* is inside its parentheses, squares it, multiplies by 2, subtracts 3 times the input, and adds 1.

## Diagrams

Think of a function as a physical pipeline or machine.

```text
     Input (x)
        │
        ▼
┌───────────────┐
│ Function f    │  Rule: Square the input,
│ f(x) = x² + 3 │  then add 3.
└───────────────┘
        │
        ▼
   Output f(x)
     (x² + 3)

Example with x = 4:
     ( 4 )
       │
       ▼
┌───────────────┐
│      f        │
└───────────────┘
       │
       ▼
     ( 19 )
```

## Memory technique — remember this forever
1. **The Meat Grinder:** Think of $f$ as an industrial meat grinder. The parentheses $()$ are the hopper at the top. $x$ is the beef you drop in. $f(x)$ is the sausage that comes out. You cannot multiply a meat grinder by beef. Therefore, $f(x)$ is NEVER "$f$ times $x$".
2. **Facts to overlearn:** 
   * $f(x)$ translates to "the output of function $f$ when the input is $x$."
   * $f(x) \neq f \times x$.
3. **Spaced-repetition schedule:** Review this concept and work 2-3 substitution problems at intervals of 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First principles pathway:** If you ever get confused by a complex input like $f(x^2 - 1)$, revert to the blank parenthesis method. Write the original rule with empty parentheses wherever the variable was: $f(\text{___}) = 2(\text{___})^2 - 3(\text{___})$. Then, physically write the new input inside every blank space.

## Common mistakes
* **Treating $f(x)$ as multiplication:** Students see $f(x)$ and think it means $f \times x$. If given $f(x) = 2x$, a student might incorrectly divide both sides by $x$ to get $f = 2$. $f$ is a name, not a numeric variable.
* **Sloppy substitution without parentheses:** When evaluating $f(-3)$ for $f(x) = x^2$, a student might write $-3^2 = -9$. The correct substitution is $(-3)^2 = 9$. Always wrap your input in parentheses.
* **Partial substitution:** When evaluating $f(x+1)$ for $f(x) = x^2 + x$, a student might write $(x+1)^2 + x$. You must replace *every single instance* of the original variable with the new input: $(x+1)^2 + (x+1)$.

## Self-check
1. Let $g(t) = 5t - 2$. Evaluate $g(4)$ and $g(-1)$.
2. Let $h(x) = x^2 - x$. Evaluate and simplify $h(3z)$.
3. Let $f(x) = 2x + 1$ and $g(x) = x^2$. Find the simplified algebraic expression for $f(g(x))$ and the expression for $g(f(x))$. Are they equal?