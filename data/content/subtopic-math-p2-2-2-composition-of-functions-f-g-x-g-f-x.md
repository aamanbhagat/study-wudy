## What it is
Function composition is the process of chaining functions together so that the output of one function becomes the direct input of the next. If you have an inner function $g$ and an outer function $f$, the composition $f(g(x))$ means you first feed $x$ into $g$, and then feed the resulting value $g(x)$ directly into $f$.

## Why it matters
In physics and rocket science, composition models chained dependencies: atmospheric density $\rho$ depends on altitude $h$, which itself depends on time $t$, yielding $\rho(h(t))$. In computer science and machine learning, deep neural networks are literally massive compositions of functions—$f_n(f_{n-1}(...f_1(x)...))$—where each layer transforms the output of the previous one. Mathematically, mastering this is the absolute prerequisite for the Chain Rule in calculus, which is how we calculate rates of change for these complex, nested systems.

## When to study it
You must already understand basic function notation (e.g., what $f(x)$ means), how to evaluate a function for a numerical input (finding $f(2)$), and algebraic substitution (replacing $x$ with an expression like $x+3$). If you are uncomfortable substituting variables into equations or expanding binomials, stop and review algebraic substitution and polynomial arithmetic first.

## How to study it (step by step)
1. **Evaluate with numbers first:** Given $f(x)$ and $g(x)$, pick a number for $x$. Calculate $g(x)$ to get a numerical output, then plug that specific number into $f$. This builds the intuition of the "assembly line."
2. **Substitute algebraic expressions:** Practice writing out $f(g(x))$ by replacing *every* instance of $x$ in the definition of $f$ with the entire algebraic expression for $g(x)$, wrapped in parentheses.
3. **Prove non-commutativity:** Calculate $f(g(x))$ and $g(f(x))$ for several pairs of functions. Observe that they almost never equal each other.
4. **Determine domains:** Find the domain of a composite function by checking two things: the domain of the inner function $g(x)$, and the domain of the final composed expression $f(g(x))$. 
5. **Decompose functions:** Work backwards. Given a complex function like $h(x) = \sqrt{2x + 1}$, identify an inner function $g(x)$ and an outer function $f(x)$ such that $h(x) = f(g(x))$. This is a vital skill for calculus.

## Key ideas, with intuition

**The Assembly Line**
Think of a function as a machine. Composition connects the output pipe of machine $g$ directly to the input pipe of machine $f$. The notation $(f \circ g)(x)$ is read as "$f$ composed with $g$" and is mathematically identical to $f(g(x))$.

**Inside-Out Evaluation**
You must evaluate from the inside out. In $f(g(x))$, $x$ is the raw material. The inner function $g$ processes it first. The outer function $f$ processes the result. 

**Order Matters (Non-Commutativity)**
Putting on your socks and then your shoes yields a fundamentally different result than putting on your shoes and then your socks. Mathematically, function composition is not commutative:
$$ f(g(x)) \neq g(f(x)) $$
(There are rare exceptions, such as when $f$ and $g$ are inverse functions, but assume they are unequal by default).

**Domain Restrictions**
The domain of $f(g(x))$ is the set of all $x$ in the domain of $g$ such that $g(x)$ is in the domain of $f$. If $x$ breaks the inner machine $g$, it never makes it to $f$. If $g$ outputs a value that breaks the outer machine $f$, that original $x$ is also invalid.

## Worked example
Let $f(x) = x^2 - 3$ and $g(x) = 2x + 1$. Find $f(g(x))$ and $g(f(x))$.

*Step 1: Find $f(g(x))$*
Write $f$, but replace every $x$ with $g(x)$:
$$ f(g(x)) = (g(x))^2 - 3 $$
Substitute the definition of $g(x)$:
$$ f(g(x)) = (2x + 1)^2 - 3 $$
Expand the binomial $(2x+1)(2x+1)$:
$$ f(g(x)) = (4x^2 + 4x + 1) - 3 $$
Simplify:
$$ f(g(x)) = 4x^2 + 4x - 2 $$

*Step 2: Find $g(f(x))$*
Write $g$, but replace every $x$ with $f(x)$:
$$ g(f(x)) = 2(f(x)) + 1 $$
Substitute the definition of $f(x)$:
$$ g(f(x)) = 2(x^2 - 3) + 1 $$
Distribute and simplify:
$$ g(f(x)) = 2x^2 - 6 + 1 $$
$$ g(f(x)) = 2x^2 - 5 $$

*Reflection:* Notice that $4x^2 + 4x - 2 \neq 2x^2 - 5$. The order of composition fundamentally changes the algebraic structure of the result. Wrapping the substituted expressions in parentheses prevented arithmetic errors during expansion.

## Diagrams

```text
       x (Raw Input)
       |
       v
+--------------+
|  Inner: g()  |  <-- First transformation
+--------------+
       |
       v  g(x) (Intermediate Output)
       |
+--------------+
|  Outer: f()  |  <-- Second transformation
+--------------+
       |
       v  f(g(x)) (Final Output)
```

## Memory technique — remember this forever
1. **Mnemonic:** Think of "Russian Nesting Dolls." The innermost doll ($x$) is inside the middle doll ($g$), which is inside the outer doll ($f$). You write them from the outside in: $f(g(x))$, but you *evaluate* them from the inside out.
2. **Overlearn these facts:**
   $$ (f \circ g)(x) = f(g(x)) $$
   $$ f(g(x)) \neq g(f(x)) $$
3. **Spaced-repetition schedule:** Review this concept and solve one composition problem at 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First principles pathway:** If you get confused by the algebra of $f(g(x))$, fall back to a dummy variable. Let $u = g(x)$. Now you are just evaluating $f(u)$. Find the expression for $u$ first, then plug $u$ into $f$.

## Common mistakes
* **Multiplying instead of composing:** Students often confuse the open circle notation $(f \circ g)(x)$ with multiplication $(f \cdot g)(x) = f(x)g(x)$. Composition is nesting, not multiplying.
* **Failing to use parentheses:** When substituting $g(x)$ into $f(x)$, failing to wrap $g(x)$ in parentheses leads to order-of-operations errors. If $f(x) = x^2$ and $g(x) = x+1$, $f(g(x))$ is $(x+1)^2$. If you don't use parentheses, you might mistakenly write $x+1^2 = x+1$.
* **Ignoring the inner domain:** When finding the domain of $f(g(x))$, students often only look at the final simplified equation. If $f(x) = x^2$ and $g(x) = \sqrt{x}$, then $f(g(x)) = (\sqrt{x})^2 = x$. The final equation $y = x$ looks like all real numbers are valid inputs. However, the domain must be restricted to $x \geq 0$ because the inner function $g(x) = \sqrt{x}$ cannot accept negative numbers.

## Self-check
1. Let $f(x) = 3x - 2$ and $g(x) = x^2$. Find the simplified expressions for $f(g(x))$ and $g(f(x))$.
2. Let $h(x) = \frac{1}{x-2}$ and $k(x) = \frac{1}{x}$. Find $(h \circ k)(x)$ and state its domain.
3. Decompose the function $T(t) = \sin^2(3t + 1)$ into three distinct functions $f, g, h$ such that $T(t) = f(g(h(t)))$.